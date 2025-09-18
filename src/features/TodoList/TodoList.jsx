import React from "react";
import TodoListItem from "./TodoListItem";

function TodoList({ todolist, onUpdateTodo, onCompleteTodo, isLoading }) {
    return (
        <>
            {todolist.length === 0 ? (
                <p>Add todo above to get started</p>
            ) : (
                <ul>
                    {todolist.map((todo) => (
                        <TodoListItem
                            key={todo.id}
                            todo={todo}
                            onUpdateTodo={onUpdateTodo}
                            onCompleteTodo={onCompleteTodo}
                        />
                    ))}
                </ul>
            )}
            {isLoading && <p style={{ fontSize: "0.9rem", color: "#888" }}>Refreshing…</p>}
        </>
    );
}

export default TodoList;
