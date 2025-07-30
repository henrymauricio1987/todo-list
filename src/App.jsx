import TodoForm from './TodoForm';
import TodoList from './TodoList';

function App() {

  return (
    <div className="container">
      <header className="header">
        <h1>📝 My Todo List</h1>
      </header>

      <section className="todo-section">
        <TodoForm />
        <TodoList />

      </section>
    </div>
  );
}

export default App;
