import TodoListItem from "./TodoListItem";

function TodoList({ todolist }) {
    return (
        <>
            {todolist.length === 0 ? (
                <p>Add todo above to get started</p>
            ) : (
                <ul>
                    {todolist.map((todo) => (
                        <TodoListItem key={todo.id} todo={todo} />
                    ))}
                </ul>
            )}
        </>
    );
}

export default TodoList;
