export const SET_TODOS = 'SET_TODOS'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'

export const UPDATE_TODO_PROGRESS = 'UPDATE_TODO_PROGRESS'
export const UPDATE_FILTER = 'UPDATE_FILTER'
export const UPDATE_IS_EDIT = 'UPDATE_IS_EDIT'


const initialState = {
    todos: [],
    filterBy: {
        text: '',
        todoState: 'all',
    },
    isEdit: false,
    progress: '',
}


export function todoReducer(state = initialState, action) {
    console.log('action -> todo.reducer.js', action)
    // console.log('state.filterBy -> todo.reducer.js', state.filterBy)
    let todos

    switch (action.type) {
        case SET_TODOS:
            todos = action.todos.filter(todo => {
                switch (state.filterBy.todoState) {
                    case 'completed':
                        return todo.isDone ? todo : ''
                    case 'active':
                        return todo.isDone ? '' : todo
                    default:
                        return todo
                }
            }).filter(todo => todo.text.toLowerCase().includes(state.filterBy.text.toLowerCase()))
            return { ...state, todos }
        case ADD_TODO:
            todos = [...state.todos, action.todo]
            return { ...state, todos }
        case UPDATE_TODO:
            todos = state.todos.map(todo => todo._id === action.todo._id ? action.todo : todo)
            return { ...state, todos }
        case REMOVE_TODO:
            todos = state.todos.filter(todo => todo._id !== action.todoId)
            return { ...state, todos }



        case UPDATE_FILTER:
            return { ...state, filterBy: action.filterBy }
        case UPDATE_IS_EDIT:
            return { ...state, isEdit: action.isEdit }
        case UPDATE_TODO_PROGRESS:
            return { ...state, progress: action.progress }


        default:
            return state
    }
}