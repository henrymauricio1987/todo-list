// src/TodoForm.jsx
import React from 'react';

const TodoForm = () => {
    return (
        <form>
            <label htmlFor="todoTitle">Todo</label>
            <input type="text" id="todoTitle" />
            <button type="submit">Add Todo</button>
        </form>
    );
};

export default TodoForm;
