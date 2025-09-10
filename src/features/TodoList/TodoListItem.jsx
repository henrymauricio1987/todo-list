import React, { useState, useRef, useEffect } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel";

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
    const [isEditing, setIsEditing] = useState(false);
    const [workingTitle, setWorkingTitle] = useState(todo.title);

    // ref for input
    const inputRef = useRef(null);

    // ✅ When editing starts → auto-focus input
    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    // ✅ Keep local title synced with latest todo from props
    useEffect(() => {
        setWorkingTitle(todo.title);
    }, [todo]);

    function handleEdit(event) {
        setWorkingTitle(event.target.value);
    }

    function handleCancel() {
        setWorkingTitle(todo.title);
        setIsEditing(false);
    }

    function handleUpdate(event) {
        event.preventDefault();
        if (!isEditing) return;

        // send updated todo to parent (App.jsx)
        onUpdateTodo({ ...todo, title: workingTitle });
        setIsEditing(false);
    }

    return (
        <li>
            <form onSubmit={handleUpdate}>
                {isEditing ? (
                    <>
                        <TextInputWithLabel
                            elementId={`todo-${todo.id}`}
                            labelText="Edit Todo"
                            value={workingTitle}
                            onChange={handleEdit}
                            inputRef={inputRef}
                        />
                        <button type="button" onClick={handleCancel}>
                            Cancel
                        </button>
                        <button type="submit">
                            Update
                        </button>
                    </>
                ) : (
                    <>
                        <label>
                            <input
                                type="checkbox"
                                id={`checkbox${todo.id}`}
                                checked={todo.isCompleted}
                                onChange={() => onCompleteTodo(todo.id)}
                            />
                        </label>
                        <span onClick={() => setIsEditing(true)}>
                            {todo.title}
                        </span>
                    </>
                )}
            </form>
        </li>
    );
}

export default TodoListItem;
