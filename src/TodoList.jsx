// App.jsx o TodoList.jsx
import TodoListItem from "./TodoListItem";

function TodoList() {
    const todos = [
        { id: 1, title: "review resources", space: " " },
        { id: 2, title: "take notes", space: " " },
        { id: 3, title: "code out app", space: " " },
    ];

    return (
        <div>
            <ul>
                {todos.map((todo) => (
                    <TodoListItem key={todo.id} todo={todo} />
                ))}
            </ul>
            <ul>
                {todos.map((todo) => (
                    <TodoListItem key={todo.id} todo={todo} />
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
