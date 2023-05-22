import { asyncStorageService } from './async-storage.service.js'
import { storageService } from './storage.service.js'
import { utilService } from './util.service.js'


const STORAGE_KEY = 'toyDB'
_createToys()


export const toyService = {
    query,
    get,
    save,
    remove,
    getEmptyToy,
}

function query() {
    return asyncStorageService.query(STORAGE_KEY)
}

function get(toyId) {
    return asyncStorageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return asyncStorageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return asyncStorageService.put(STORAGE_KEY, toy)
    } else {
        return asyncStorageService.post(STORAGE_KEY, toy)
    }
}


function getEmptyToy() {
    return {
        makeId: utilService.makeId(),
        name: '',
        price: 123,
        labels: [],
        createdAt: Date.now(),
        inStock: true,
    }
}
//---------------Private Functions---------------//

function _createToys() {
    const toy = storageService.loadFromStorage(STORAGE_KEY) || []
    if (!toy || toy.length < 1) {
        toy.push(
            _createToy(),
        )
        storageService.saveToStorage(STORAGE_KEY, toy)
    }
}

function _createToy() {
    return {
        id: 't101',
        name: 'Talking Doll',
        price: 123,
        labels: ['Doll', 'Battery Powered', 'Baby'],
        createdAt: 1631031801011,
        inStock: true,
    }
}
