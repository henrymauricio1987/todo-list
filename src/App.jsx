import TodoForm from './features/TodoForm';
import TodoList from './features/TodoList/TodoList';
import TodosViewForm from './features/TodosViewForm';
import { useState, useEffect, useReducer } from 'react';
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

  // Sorting state
  const [sortField, setSortField] = useState("createdTime");
  const [sortDirection, setSortDirection] = useState("desc");

  // ✅ Search state
  const [queryString, setQueryString] = useState("");

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
      <header className={styles.header}>
        <h1>📝 My Todo List 📝</h1>
      </header>

      <section className={styles.todoSection}>
        <TodoForm onAddTodo={addTodo} isSaving={todoState.isSaving} />

        <TodoList
          todolist={todoState.todoList}
          onUpdateTodo={updateTodo}
          onCompleteTodo={completeTodo}
          onDeleteTodo={deleteTodo}
          isLoading={todoState.isLoading}
        />

        <hr />

        {/* TodosViewForm with search */}
        <TodosViewForm
          sortField={sortField}
          setSortField={setSortField}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
          queryString={queryString}
          setQueryString={setQueryString}
          onSubmit={preventRefresh}
        />

        {successMessage && (
          <div className={styles.success} aria-live="polite">
            <p>{successMessage}</p>
            <button onClick={() => setSuccessMessage("")}>Dismiss</button>
          </div>
        )}

        {todoState.errorMessage && (
          <div className={styles.error} aria-live="assertive">
            <p>{todoState.errorMessage}</p>
            <button onClick={() => dispatch({ type: todoActions.clearError })}>Dismiss</button>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
