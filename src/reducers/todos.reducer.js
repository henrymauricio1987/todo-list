const actions = {
    //actions in useEffect that loads todos
    fetchTodos: 'fetchTodos',
    loadTodos: 'loadTodos',
    //found in useEffect and addTodo to handle failed requests
    setLoadError: 'setLoadError',
    //actions found in addTodo
    startRequest: 'startRequest',
    addTodo: 'addTodo',
    endRequest: 'endRequest',
    //found in helper functions 
    updateTodo: 'updateTodo',
    completeTodo: 'completeTodo',
    //reverts todos when requests fail
    revertTodo: 'revertTodo',
    //action on Dismiss Error button
    clearError: 'clearError',
};

const initialState = {
    todoList: [],
    isLoading: false,
    isSaving: false,
    errorMessage: "",
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case actions.fetchTodos:
            return {
                ...state,
                isLoading: true,
            };
        case actions.loadTodos: {
            // Map records to todos with isCompleted default
            const fetchedTodos = action.records.map((record) => {
                const todo = { id: record.id, ...record.fields };
                if (!todo.isCompleted) todo.isCompleted = false;
                return todo;
            });
            return {
                ...state,
                todoList: fetchedTodos,
                isLoading: false,
            };
        }
        case actions.setLoadError:
            return {
                ...state,
                errorMessage: action.error.message,
                isLoading: false,
            };
        case actions.startRequest:
            return {
                ...state,
                isSaving: true,
            };
        case actions.addTodo: {
            // Create savedTodo with isCompleted default
            const savedTodo = { id: action.records[0].id, ...action.records[0].fields };
            if (!savedTodo.isCompleted) savedTodo.isCompleted = false;

            return {
                ...state,
                todoList: [...state.todoList, savedTodo],
                isSaving: false,
            };
        }
        case actions.endRequest:
            return {
                ...state,
                isLoading: false,
                isSaving: false,
            };
        case actions.revertTodo:
        case actions.updateTodo: {
            // Handle both update and revert with same logic
            const updatedTodos = state.todoList.map((todo) =>
                todo.id === action.editedTodo.id ? { ...action.editedTodo } : todo
            );

            const updatedState = {
                ...state,
                todoList: updatedTodos,
            };

            // Add error message if present
            if (action.error) {
                updatedState.errorMessage = action.error.message;
            }

            return updatedState;
        }
        case actions.completeTodo: {
            const updatedTodos = state.todoList.map((todo) =>
                todo.id === action.id ? { ...todo, isCompleted: true } : todo
            );
            return {
                ...state,
                todoList: updatedTodos,
            };
        }
        case actions.clearError:
            return {
                ...state,
                errorMessage: "",
            };
        default:
            return state;
    }
}

export { reducer, actions, initialState };