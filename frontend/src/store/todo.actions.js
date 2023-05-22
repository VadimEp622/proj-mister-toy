import { todoService as toyService } from "../services/todo.service.js"
import { store } from './store.js'
import { SET_TOYS, ADD_TOY, REMOVE_TOY, UPDATE_TOY } from './toy.reducer.js'


export function loadToys() {
    return toyService.query()
        .then(toys => {
            store.dispatch({ type: SET_TOYS, toys })
            return
        })
        .catch(err => {
            console.log('toy action -> cannot load toys', err)
            throw err
        })
}

export function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    return toyService.save(toy)
        .then(savedToy => {
            store.dispatch({ type, savedToy })
            return savedToy
        })
        .catch(err => {
            console.log('toy action -> cannot save toy', err)
            throw err
        })
}

export function removeToy(toy) {
    return toyService.remove(toy)
        .then(() => {
            console.log('toyId from -> toy.actions.js', toy)
            store.dispatch({ type: REMOVE_TOY, toy })
        })
        .catch(err => {
            console.log('toy action -> Cannot remove toy', err)
            throw err
        })
}


// export function updateTodosProgress() {
//     return toyService.query()
//         .then(toys => {
//             const progress = toyService.getProgress(toys)
//             store.dispatch({ type: UPDATE_TODO_PROGRESS, progress })
//         })
// }

