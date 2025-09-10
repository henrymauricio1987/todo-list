import TodoListItem from "./TodoListItem";

function TodoList({ todolist, onUpdateTodo, onCompleteTodo, isLoading }) {
    if (isLoading) {
        return <p>Todo list loading...</p>; // ✅ show loading
    }

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
        </>
    );
}

export default TodoList;
