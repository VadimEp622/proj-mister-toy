import { toyService } from "../services/toy.service.js"
import { store } from './store.js'
import { SET_TOYS, ADD_TOY, REMOVE_TOY, UPDATE_TOY } from './toy.reducer.js'


export function loadToys(filterBy = {}, sortBy = {}) {
    return toyService.query(filterBy, sortBy)
        .then(toys => store.dispatch({ type: SET_TOYS, toys }))
        .catch(err => {
            console.log('toy action -> cannot load toys', err)
            throw err
        })
}

export function saveToy(toy) {
    const type = toy._id ? UPDATE_TOY : ADD_TOY
    // console.log('toy -> from toy.action.js', toy)
    return toyService.save(toy)
        .then(toy => {
            store.dispatch({ type, toy })
            return toy
        })
        .catch(err => {
            console.log('toy action -> cannot save toy', err)
            throw err
        })
}

export function removeToy(toyId) {
    console.log(toyId)
    return toyService.remove(toyId)
        .then(() => {
            // console.log('toyId from -> toy.actions.js', toyId)
            store.dispatch({ type: REMOVE_TOY, toyId })
        })
        .catch(err => {
            console.log('toy action -> Cannot remove toy', err)
            throw err
        })
}


