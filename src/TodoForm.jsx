// src/TodoForm.jsx
import React, { useRef } from 'react';

const TodoForm = ({ onAddTodo }) => {
    // 📌 Create a reference for the input element
    const todoTitleInput = useRef(null);

    function handleAddTodo(event) {
        event.preventDefault(); // Stop page reload

        // 📌 Get the typed value
        const title = event.target.title.value;

        // 📌 Send to parent
        onAddTodo(title);

        // 📌 Clear the input
        event.target.title.value = "";

        // 📌 Re-focus the input field
        todoTitleInput.current.focus();
    }

    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Todo</label>
            <input
                type="text"
                id="todoTitle"
                name="title"
                ref={todoTitleInput} // 📌 Attach the ref here
            />
            <button type="submit">Add Todo</button>
        </form>
    );
};

export default TodoForm;
