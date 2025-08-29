import React, { useRef, useState } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel";

const TodoForm = ({ onAddTodo }) => {
    const [todoTitle, setTodoTitle] = useState("");
    const todoTitleInput = useRef(null);

    function handleAddTodo(event) {
        event.preventDefault();

        onAddTodo(todoTitle);
        setTodoTitle("");

        todoTitleInput.current.focus();
    }

    return (
        <form onSubmit={handleAddTodo}>
            <TextInputWithLabel
                elementId="todoTitle"
                labelText="Todo"
                ref={todoTitleInput}
                value={todoTitle}
                onChange={(e) => setTodoTitle(e.target.value)}
            />
            <button type="submit">Add Todo</button>
        </form>
    );
};

export default TodoForm;
