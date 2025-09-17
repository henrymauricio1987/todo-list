import MyForm from './MyForm';
import TodoForm from './features/TodoForm';
import TodoList from './features/TodoList/TodoList';
import TodosViewForm from './features/TodosViewForm';
import { useState, useEffect } from 'react';

// Airtable token
const token = `Bearer ${import.meta.env.VITE_PAT}`;

// ✅ Utility function updated to include queryString
const encodeUrl = ({ sortField, sortDirection, queryString }) => {
  const baseUrl = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;

  let searchQuery = '';
  if (queryString) {
    searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
  }

  return encodeURI(`${baseUrl}?${sortQuery}${searchQuery}`);
};

function App() {
  const [todolist, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Sorting state
  const [sortField, setSortField] = useState("createdTime");
  const [sortDirection, setSortDirection] = useState("desc");

  // ✅ Search state
  const [queryString, setQueryString] = useState("");

  // Load todos when sort or search changes
  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      const options = { method: "GET", headers: { Authorization: token } };

      try {
        const resp = await fetch(
          encodeUrl({ sortField, sortDirection, queryString }),
          options
        );
        if (!resp.ok) throw new Error(resp.statusText || "Failed to fetch todos");

        const { records } = await resp.json();
        const fetchedTodos = records.map((record) => {
          const fields = record.fields;
          return {
            id: record.id,
            ...fields,
            isCompleted: fields.isCompleted ?? false,
          };
        });

        setTodoList(fetchedTodos);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
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
      setIsSaving(true);
      const resp = await fetch(
        encodeUrl({ sortField, sortDirection, queryString }),
        options
      );
      if (!resp.ok) throw new Error(resp.statusText || "Failed to save todo");

      const { records } = await resp.json();
      const savedTodo = { id: records[0].id, ...records[0].fields };
      if (!savedTodo.isCompleted) savedTodo.isCompleted = false;

      setTodoList([...todolist, savedTodo]);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  // ✅ Update todo
  const updateTodo = async (editedTodo) => {
    const originalTodo = todolist.find((todo) => todo.id === editedTodo.id);

    const updatedTodos = todolist.map((todo) =>
      todo.id === editedTodo.id
        ? { ...editedTodo, isCompleted: editedTodo.isCompleted ?? false }
        : todo
    );

    setTodoList(updatedTodos);

    const payload = { records: [{ id: editedTodo.id, fields: editedTodo }] };
    const options = {
      method: "PATCH",
      headers: { Authorization: token, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };

    try {
      const resp = await fetch(
        encodeUrl({ sortField, sortDirection, queryString }),
        options
      );
      if (!resp.ok) throw new Error(resp.statusText || "Failed to update todo");
    } catch (error) {
      console.error(error);
      setErrorMessage(`${error.message}. Reverting todo...`);
      const revertedTodos = todolist.map((todo) =>
        todo.id === originalTodo.id ? { ...originalTodo } : todo
      );

      setTodoList(revertedTodos);
    } finally {
      setIsSaving(false);
    }
  };

  // ✅ Complete todo
  const completeTodo = (id) => {
    const todoToComplete = todolist.find((todo) => todo.id === id);
    if (!todoToComplete) return;

    const completedTodo = { ...todoToComplete, isCompleted: true };
    updateTodo(completedTodo);
  };

  // Prevent form refresh
  const preventRefresh = (e) => e.preventDefault();

  return (
    <div className="container">
      <header className="header">
        <h1>📝 My Todo List 📝</h1>
      </header>

      <section className="todo-section">
        <TodoForm onAddTodo={addTodo} isSaving={isSaving} />

        <TodoList
          todolist={todolist}
          onUpdateTodo={updateTodo}
          onCompleteTodo={completeTodo}
          isLoading={isLoading}
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

        {errorMessage && (
          <div className="error">
            <p>{errorMessage}</p>
            <button onClick={() => setErrorMessage("")}>Dismiss</button>
          </div>
        )}

        <MyForm />
      </section>
    </div>
  );
}

export default App;
