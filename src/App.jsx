import MyForm from './MyForm';
import TodoForm from './features/TodoForm';
import TodoList from './features/TodoList/TodoList';
import { useState } from 'react';

function App() {
  const [todolist, setTodoList] = useState([]);

  const addTodo = (title) => {
    const newTodo = {
      title: title,
      id: Date.now(),
      isCompleted: false,
    };
    setTodoList([...todolist, newTodo]);
  };

  const updateTodo = (editedTodo) => {
    const updatedTodos = todolist.map((todo) =>
      todo.id === editedTodo.id ? { ...editedTodo } : todo
    );
    setTodoList(updatedTodos);
  };

  // ✅ Now always sets isCompleted to true
  const completeTodo = (id) => {
    const updatedTodos = todolist.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: true } : todo
    );
    setTodoList(updatedTodos);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>📝 My Todo List 📝</h1>
      </header>

      <section className="todo-section">
        <TodoForm onAddTodo={addTodo} />
        <TodoList
          todolist={todolist}
          onUpdateTodo={updateTodo}
          onCompleteTodo={completeTodo}
        />
        <MyForm />
      </section>
    </div>
  );
}

export default App;
