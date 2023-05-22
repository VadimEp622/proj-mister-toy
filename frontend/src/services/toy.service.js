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
        name: '',
        price: '',
        labels: [],
        createdAt: Date.now(),
        inStock: true,
    }
}



//---------------Private Functions---------------//

// const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
function _createToys() {
    const toy = storageService.loadFromStorage(STORAGE_KEY) || []
    if (!toy || toy.length < 1) {
        toy.push(
            _createToy('Talking Doll', 612, ['Doll', 'Battery Powered', 'Baby'], true),
            _createToy('Robot Toy', 82, ['Battery Powered', 'Baby'], true),
            _createToy('YU-GI-OH Cards', 127, ['Art', 'Puzzle', 'Outdoor'], false),
            _createToy('Lego', 16, ['Art', 'Puzzle', 'Baby'], true),
            _createToy('Racing Car', 95, ['On wheels', 'Outdoor', 'Baby', 'Battery Powered'], false),
        )
        storageService.saveToStorage(STORAGE_KEY, toy)
    }
}

function _createToy(name, price, labels, inStock) {
    return {
        id: utilService.makeId(),
        createdAt: utilService.getRandomPastYearTimestamp(),
        name,
        price,
        labels,
        inStock,
    }
}
