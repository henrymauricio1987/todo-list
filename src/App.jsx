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

      {/* Formulario para agregar todos */}
      <section className="todo-section">
        <TodoForm />
        <TodoList />
      </section>

      {/* Contador simple */}
      <footer className="footer">
        <button onClick={() => setCount(count + 1)} className="count-button">
          Count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </footer>
    </div>
  );
}

export default App;
