import { asyncStorageService } from './async-storage.service.js'
import { storageService } from './storage.service.js'
import { utilService } from './util.service.js'


const STORAGE_KEY = 'todoDB'
_createTodos()


export const todoService = {
    query,
    get,
    save,
    remove,
    getEmptyTodo,
    getProgress,
}

function query() {
    return asyncStorageService.query(STORAGE_KEY)
}

function get(todoId) {
    return asyncStorageService.get(STORAGE_KEY, todoId)
}

function remove(todoId) {
    return asyncStorageService.remove(STORAGE_KEY, todoId)
}

// function save(todo) {
//     if (todo._id) {
//         return asyncStorageService.put(STORAGE_KEY, toy)
//     } else {
//         return asyncStorageService.post(STORAGE_KEY, toy)
//     }
// }


function getProgress(todos) {
    const total = todos.length
    const doneAmount = todos.reduce((acc, todo) => {
        return todo.isDone ? acc + 1 : acc
    }, 0)
    const result = (doneAmount === 0) ? 0 : (doneAmount * 100 / total).toFixed(2)
    return `${result} %`
}


function getEmptyTodo() {
    return {
        text: '',
        isDone: false,
    }
}



//---------------Private Functions---------------//

function _createTodos() {
    const todo = storageService.loadFromStorage(STORAGE_KEY) || []
    if (!todo || todo.length < 1) {
        todo.push(
            _createTodo('Clean dishes'),
            _createTodo('Cook'),
            _createTodo('Take out trash'),
            _createTodo('Cry after looking at unfinished code', true),
            _createTodo('Condition self to stop crying after exactly 10 minutes', true),
            _createTodo('Have reward ice cream')
        )
        storageService.saveToStorage(STORAGE_KEY, todo)
    }
}

function _createTodo(text, isDone = false) {
    return {
        _id: utilService.makeId(),
        text,
        isDone,
        createdAt: Date.now(),
    }
}
