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

  // NUEVO: función para actualizar un todo
  const updateTodo = (editedTodo) => {
    const updatedTodos = todolist.map((todo) =>
      todo.id === editedTodo.id ? { ...editedTodo } : todo
    );
    setTodoList(updatedTodos);
  };

  const completeTodo = (id) => {
    const updatedTodos = todolist.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
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
        {/* Pasamos updateTodo y completeTodo a la lista */}
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

export default App;;
