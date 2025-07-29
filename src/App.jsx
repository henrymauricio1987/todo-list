import { useState } from 'react';
import './App.css';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <header className="header">
        <h1>📝 My Todo List</h1>
        <p className="subtitle">Stay organized and productive</p>
      </header>

      <section className="todo-section">
        <TodoForm />
        <TodoList />

      </section>

      <footer className="footer">

      </footer>
    </div>

  );

}

export default App;