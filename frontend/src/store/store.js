const { createStore, combineReducers } = Redux


import { todoReducer } from './todo.reducer.js'
import { userReducer } from './user.reducer.js'

const rootReducer = combineReducers({
    todoModule: todoReducer,
    userModule: userReducer
})



const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
export const store = createStore(rootReducer, middleware)