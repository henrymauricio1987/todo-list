import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { useState } from 'react';

function App() {
  const [newTodo, setNewTodo] = useState("Learn React");

  return (
    <div className="container">
      <header className="header">
        <h1>📝 My Todo List</h1>
      </header>

      <section className="todo-section">
        <TodoForm />
        <p>This is my form</p>
        <TodoList />

        <p>{newTodo}</p>
        <p>{setNewTodo}</p>

      </section>
    </div>
  );
}

export default App;
