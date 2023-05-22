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
    getDefaultFilter
}



function query(filterBy, sortBy) {
    console.log('filterBy', filterBy)
    return asyncStorageService.query(STORAGE_KEY)
        .then((toys) => {
            if (filterBy.name) {
                const regExp = new RegExp(filterBy.name, 'i')
                toys = toys.filter(toy => regExp.test(toy.name))
            }
            if (filterBy.inStock) {
                toys = toys.filter(toy => toy.inStock === filterBy.inStock)
            }
            if (filterBy.maxPrice) {
                toys = toys.filter(toy => toy.price <= filterBy.maxPrice)
            }
            if (filterBy.labels && filterBy.labels.length > 0) {
                // console.log('filterBy.labels', filterBy.labels)
                const labels = filterBy.labels.split(',')
                toys = toys.filter(toy => labels.every(l => toy.labels.includes(l)))
            }
            if (sortBy) _getSortedToys(toys, sortBy)
            // if (filterBy.pageIdx != undefined) {
            //     pages = Math.ceil(toys.length / PAGE_SIZE)
            //     if (filterBy.pageIdx + 1 < pages || filterBy.pageIdx > 0) {
            //         const startIdx = filterBy.pageIdx * PAGE_SIZE
            //         toys = toys.slice(startIdx, startIdx + PAGE_SIZE)
            //     }
            // }
            return toys
        })
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

function getDefaultFilter() {
    return { name: '', maxPrice: '', inStock: '', labels: '' }
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

function _getSortedToys(toysToDisplay, sortBy) {
    toysToDisplay.sort(
        (t1, t2) => {
            const value1 = t1[sortBy.type]
            const value2 = t2[sortBy.type]
            return sortBy.desc * (typeof value1 === 'string' && typeof value2 === 'string'
                ? value2.localeCompare(value1)
                : value2 - value1
            )
        }
    )
}