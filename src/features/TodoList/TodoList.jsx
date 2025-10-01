import React from "react";
import TodoListItem from "./TodoListItem";
import styles from "./TodoList.module.css";

function TodoList({ todolist, onUpdateTodo, onCompleteTodo, onDeleteTodo, isLoading }) {
    return (
        <>
            {todolist.length === 0 ? (
                <p className={styles.emptyMessage}>Add todo above to get started</p>
            ) : (
                <ul className={styles.todoList}>
                    {todolist.map((todo) => (
                        <TodoListItem
                            key={todo.id}
                            todo={todo}
                            onUpdateTodo={onUpdateTodo}
                            onCompleteTodo={onCompleteTodo}
                            onDeleteTodo={onDeleteTodo}
                        />
                    ))}
                </ul>
            )}
            {isLoading && <p className={styles.loadingMessage}>Refreshing…</p>}
        </>
    );
}

export default TodoList;
