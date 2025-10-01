import React, { useState, useRef, useEffect } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel";
import styles from "./TodoListItem.module.css";

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo, onDeleteTodo }) {
    const [isEditing, setIsEditing] = useState(false);
    const [workingTitle, setWorkingTitle] = useState(todo.title);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isEditing && inputRef.current) inputRef.current.focus();
    }, [isEditing]);

    useEffect(() => {
        setWorkingTitle(todo.title);
    }, [todo]);

    const handleEdit = (e) => setWorkingTitle(e.target.value);
    const handleCancel = () => {
        setWorkingTitle(todo.title);
        setIsEditing(false);
    };
    const handleUpdate = (e) => {
        e.preventDefault();
        if (!isEditing) return;
        onUpdateTodo({ ...todo, title: workingTitle });
        setIsEditing(false);
    };

    return (
        <li className={styles.todoItem}>
            <form onSubmit={handleUpdate} className={styles.editForm}>
                {isEditing ? (
                    <>
                        <TextInputWithLabel
                            elementId={`todo-${todo.id}`}
                            labelText="Edit Todo"
                            value={workingTitle}
                            onChange={handleEdit}
                            ref={inputRef}
                        />
                        <button type="button" onClick={handleCancel} className={styles.cancelButton}>Cancel</button>
                        <button type="submit" className={styles.updateButton}>Update</button>
                    </>
                ) : (
                    <>
                        <label className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                id={`checkbox${todo.id}`}
                                checked={todo.isCompleted}
                                onChange={() => onCompleteTodo(todo.id)}
                            />
                        </label>
                        <span onClick={() => setIsEditing(true)} className={`${styles.todoTitle} ${todo.isCompleted ? styles.completed : ''}`}>{todo.title}</span>
                        <button onClick={() => onDeleteTodo(todo.id)} className={styles.deleteButton}>Delete</button>
                    </>
                )}
            </form>
        </li>
    );
}

export default TodoListItem;
