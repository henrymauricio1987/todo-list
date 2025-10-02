import TodoForm from '../features/TodoForm';
import TodoList from '../features/TodoList/TodoList';
import TodosViewForm from '../features/TodosViewForm';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from '../App.module.css';

function TodosPage({
    todoState,
    onAddTodo,
    onUpdateTodo,
    onCompleteTodo,
    onDeleteTodo,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    queryString,
    setQueryString,
    successMessage,
    setSuccessMessage,
    dispatch,
    todoActions,
    preventRefresh
}) {
    const [searchParams, setSearchParams] = useSearchParams();

    // Pagination constants
    const itemsPerPage = 15;
    const currentPage = parseInt(searchParams.get('page') || '1', 10);

    // Filter todos based on search query
    const filteredTodoList = todoState.todoList.filter(todo =>
        !queryString || todo.title.toLowerCase().includes(queryString.toLowerCase())
    );

    // Pagination calculations
    const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;
    const totalPages = Math.ceil(filteredTodoList.length / itemsPerPage);
    const currentTodos = filteredTodoList.slice(indexOfFirstTodo, indexOfFirstTodo + itemsPerPage);

    // Navigation handlers
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setSearchParams({ page: (currentPage - 1).toString() });
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setSearchParams({ page: (currentPage + 1).toString() });
        }
    };

    // Protect against invalid URL parameters
    useEffect(() => {
        if (totalPages > 0) {
            if (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
                setSearchParams({});
            }
        }
    }, [currentPage, totalPages, setSearchParams]);

    return (
        <section className={styles.todoSection}>
            <TodoForm onAddTodo={onAddTodo} isSaving={todoState.isSaving} />

            <TodoList
                todolist={currentTodos}
                onUpdateTodo={onUpdateTodo}
                onCompleteTodo={onCompleteTodo}
                onDeleteTodo={onDeleteTodo}
                isLoading={todoState.isLoading}
            />

            {/* Pagination Controls */}
            {filteredTodoList.length > itemsPerPage && (
                <div className={styles.paginationControls}>
                    <button
                        onClick={handlePreviousPage}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}

            <hr />

            {/* TodosViewForm with search */}
            <TodosViewForm
                sortField={sortField}
                setSortField={setSortField}
                sortDirection={sortDirection}
                setSortDirection={setSortDirection}
                queryString={queryString}
                setQueryString={setQueryString}
                onSubmit={preventRefresh}
            />

            {successMessage && (
                <div className={styles.success} aria-live="polite">
                    <p>{successMessage}</p>
                    <button onClick={() => setSuccessMessage("")}>Dismiss</button>
                </div>
            )}

            {todoState.errorMessage && (
                <div className={styles.error} aria-live="assertive">
                    <p>{todoState.errorMessage}</p>
                    <button onClick={() => dispatch({ type: todoActions.clearError })}>Dismiss</button>
                </div>
            )}
        </section>
    );
}

export default TodosPage;