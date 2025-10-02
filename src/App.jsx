import TodosPage from './pages/TodosPage';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Header from './shared/Header';
import { useState, useEffect, useReducer } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import styles from './App.module.css';
import {
  reducer as todosReducer,
  actions as todoActions,
  initialState as initialTodosState,
} from './reducers/todos.reducer';

// Airtable token
const token = `Bearer ${import.meta.env.VITE_PAT}`;

// ✅ Utility function updated to include queryString
const baseUrl = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;

const encodeUrl = ({ sortField, sortDirection, queryString }) => {
  const sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;

  let searchQuery = '';
  if (queryString) {
    searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
  }

  return encodeURI(`${baseUrl}?${sortQuery}${searchQuery}`);
};

function App() {
  const [todoState, dispatch] = useReducer(todosReducer, initialTodosState);
  const [successMessage, setSuccessMessage] = useState("");
  const [title, setTitle] = useState("Todo List");

  // Sorting state
  const [sortField, setSortField] = useState("createdTime");
  const [sortDirection, setSortDirection] = useState("desc");

  // ✅ Search state
  const [queryString, setQueryString] = useState("");

  // Get current location for title updates
  const location = useLocation();

  // Update title based on current route
  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setTitle("Todo List");
        break;
      case "/about":
        setTitle("About");
        break;
      default:
        setTitle("Not Found");
        break;
    }
  }, [location]);

  // Load todos when sort or search changes
  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: todoActions.fetchTodos });
      const options = { method: "GET", headers: { Authorization: token } };

      try {
        const resp = await fetch(
          encodeUrl({ sortField, sortDirection, queryString }),
          options
        );
        if (!resp.ok) throw new Error(resp.statusText || "Failed to fetch todos");

        const { records } = await resp.json();
        dispatch({ type: todoActions.loadTodos, records });
      } catch (error) {
        dispatch({ type: todoActions.setLoadError, error });
      }
    };

    fetchTodos();
  }, [sortField, sortDirection, queryString]);

  // ✅ Add new todo
  const addTodo = async (title) => {
    const newTodo = { title, isCompleted: false };
    const payload = { records: [{ fields: newTodo }] };
    const options = {
      method: "POST",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };

    try {
      dispatch({ type: todoActions.startRequest });
      const resp = await fetch(baseUrl, options);
      if (!resp.ok) throw new Error(resp.statusText || "Failed to save todo");

      const { records } = await resp.json();
      dispatch({ type: todoActions.addTodo, records });
      setSuccessMessage("Todo added successfully");
    } catch (error) {
      console.error(error);
      dispatch({ type: todoActions.setLoadError, error });
    }
  };

  // ✅ Update todo
  const updateTodo = async (editedTodo) => {
    const originalTodo = todoState.todoList.find((todo) => todo.id === editedTodo.id);

    // Optimistically update the todo
    dispatch({ type: todoActions.updateTodo, editedTodo });

    const payload = { records: [{ id: editedTodo.id, fields: editedTodo }] };
    const options = {
      method: "PATCH",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };

    try {
      const resp = await fetch(baseUrl, options);
      if (!resp.ok) throw new Error(resp.statusText || "Failed to update todo");
      setSuccessMessage("Todo updated successfully");
    } catch (error) {
      console.error(error);
      const errorWithMessage = { message: `${error.message}. Reverting todo...` };
      dispatch({ type: todoActions.revertTodo, editedTodo: originalTodo, error: errorWithMessage });
    }
  };

  // ✅ Complete todo
  const completeTodo = (id) => {
    const todoToComplete = todoState.todoList.find((todo) => todo.id === id);
    if (!todoToComplete) return;

    const completedTodo = { ...todoToComplete, isCompleted: true };
    updateTodo(completedTodo);
  };

  // ✅ Delete todo
  const deleteTodo = async (id) => {
    const options = { method: "DELETE", headers: { Authorization: token } };

    try {
      const resp = await fetch(`${baseUrl}/${id}`, options);
      if (!resp.ok) throw new Error(resp.statusText || "Failed to delete todo");

      // Note: Delete functionality isn't part of the reducer pattern in this assignment
      // For now, we'll need to manually update the state or add a delete action
      setSuccessMessage("Todo deleted successfully");
    } catch (error) {
      console.error(error);
      dispatch({ type: todoActions.setLoadError, error });
    }
  };

  // Prevent form refresh
  const preventRefresh = (e) => e.preventDefault();

  return (
    <div className={styles.container}>
      <Header title={title} />

      <Routes>
        <Route
          path="/"
          element={
            <TodosPage
              todoState={todoState}
              onAddTodo={addTodo}
              onUpdateTodo={updateTodo}
              onCompleteTodo={completeTodo}
              onDeleteTodo={deleteTodo}
              sortField={sortField}
              setSortField={setSortField}
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}
              queryString={queryString}
              setQueryString={setQueryString}
              successMessage={successMessage}
              setSuccessMessage={setSuccessMessage}
              dispatch={dispatch}
              todoActions={todoActions}
              preventRefresh={preventRefresh}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
