import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { useState } from 'react';

function App() {
  const [newTodo, /*setNewTodo]*/] = useState("Learn React");

  return (
    <div className="container">
      <header className="header">
        <h1>📝 My Todo List</h1>
      </header>

      <section className="todo-section">
        <TodoForm />
        <p>this is my form</p>
        <p>{newTodo}</p>
        <TodoList />

      </section>
    </div>
  );
}

export default App;
