import React, { useRef, useState } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel";

const TodoForm = ({ onAddTodo, isSaving }) => {
    const [todoTitle, setTodoTitle] = useState("");
    const todoTitleInput = useRef(null);

    async function handleAddTodo(event) {
        event.preventDefault();

        if (todoTitle.trim() === "") return;

        // Wait for Airtable save to finish
        await onAddTodo(todoTitle);

        // Reset input + focus again
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
            <button
                type="submit"
                disabled={todoTitle.trim() === "" || isSaving}
            >
                {isSaving ? "Saving..." : "Add Todo"}
            </button>
        </form>
    );
};

export default TodoForm;
