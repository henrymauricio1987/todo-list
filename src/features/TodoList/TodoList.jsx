import TodoListItem from "./TodoListItem";

function TodoList({ todolist, onUpdateTodo, onCompleteTodo }) {
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
