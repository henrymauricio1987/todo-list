import MyForm from './MyForm';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { useState } from 'react';

function App() {
  const [todolist, setTodoList] = useState([]);

  const addTodo = (title) => {
    const newTodo = {
      title: title,
      id: Date.now()
    };
    setTodoList([...todolist, newTodo]);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>📝 My Todo List</h1>
      </header>

      <section className="todo-section">
        <TodoForm onAddTodo={addTodo} />
        <TodoList todolist={todolist} /> {/* ✅ Passing the state here */}
        <MyForm />
      </section>
    </div>
  );
}

export default App;;
