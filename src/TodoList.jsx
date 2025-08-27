import TodoListItem from "./TodoListItem";

function TodoList({ todolist }) {
    return (
        <ul>
            {todolist.map((todo) => (
                <TodoListItem key={todo.id} todo={todo} />
            ))}
        </ul>
    );
}


export default TodoList;
