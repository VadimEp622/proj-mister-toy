import { todoService } from "../services/todo.service.js"
import { store } from './store.js'
import { SET_TODOS, ADD_TODO, REMOVE_TODO, UPDATE_TODO, UPDATE_TODO_PROGRESS } from './todo.reducer.js'


export function loadTodos() {
    return todoService.query()
        .then(todos => {
            store.dispatch({ type: SET_TODOS, todos })
            updateTodosProgress()
            return
        })
        .catch(err => {
            console.log('todo action -> cannot load todos', err)
            throw err
        })
}

export function saveTodo(todo) {
    const type = todo._id ? UPDATE_TODO : ADD_TODO
    return todoService.save(todo)
        .then(savedTodo => {
            store.dispatch({ type, todo: savedTodo })
            updateTodosProgress()
            return savedTodo
        })
        .catch(err => {
            console.log('todo action -> cannot save todo', err)
            throw err
        })
}

export function removeTodo(todoId) {
    return todoService.remove(todoId)
        .then(() => {
            console.log('todoId from -> todo.actions.js', todoId)
            store.dispatch({ type: REMOVE_TODO, todoId })
            updateTodosProgress()
        })
        .catch(err => {
            console.log('todo action -> Cannot remove todo', err)
            throw err
        })
}


export function updateTodosProgress() {
    return todoService.query()
        .then(todos => {
            const progress = todoService.getProgress(todos)
            store.dispatch({ type: UPDATE_TODO_PROGRESS, progress })
        })
}

