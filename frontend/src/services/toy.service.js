// import { asyncStorageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
// import { storageService } from './storage.service.js'



// const STORAGE_KEY = 'toyDB'
const BASE_URL = 'toy/'

// _createToys()


export const toyService = {
    query,
    get,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    countToysPerLabel,
    addToyMsg,
    removeToyMsg,
    getEmptyMsg,
}



function query(filterBy, sortBy) {
    return httpService.get(BASE_URL, { filterBy, sortBy })
}
// if (filterBy.pageIdx != undefined) {
//     pages = Math.ceil(toys.length / PAGE_SIZE)
//     if (filterBy.pageIdx + 1 < pages || filterBy.pageIdx > 0) {
//         const startIdx = filterBy.pageIdx * PAGE_SIZE
//         toys = toys.slice(startIdx, startIdx + PAGE_SIZE)
//     }
// }
// return toys



function get(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    const method = toy._id ? 'put' : 'post'
    // return httpService[method](BASE_URL, toy)
    return httpService[method](BASE_URL + ((toy._id) ? toy._id : ''), toy)
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: [],
        createdAt: Date.now(),
        inStock: Math.random() > 0.5 ? true : false,
    }
}

function getDefaultFilter() {
    return { name: '', maxPrice: '', inStock: '', labels: [] }
}

function countToysPerLabel(toys, labels) {
    const countToysPerLabel = labels.map(label => toys.reduce((acc, toy) => {
        if (!toy.inStock) return acc
        return toy.labels.includes(label) ? acc + 1 : acc
    }, 0))
    console.log('countToysPerLabel', countToysPerLabel)
    return countToysPerLabel
}



async function addToyMsg(toyId, msg) {
    try {
        const savedMsg = await httpService.post(`toy/${toyId}/msg`, { msg })
        return savedMsg
    } catch (err) {
        console.log('couldnt add toy msg:', err)
    }
}

async function removeToyMsg(toyId, msgId) {
    try {
        const savedMsg = await httpService.delete(`toy/${toyId}/msg/${msgId}`)
        return savedMsg
    } catch (err) {
        console.log('couldnt remove toy msg:', err)
    }
}
function getEmptyMsg() {
    return {
        id: utilService.makeId(),
        txt: ''
    }
}





//---------------Private Functions---------------//

// const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']
// function _createToys() {
//     const toy = storageService.loadFromStorage(STORAGE_KEY) || []
//     if (!toy || toy.length < 1) {
//         toy.push(
//             _createToy('Talking Doll', 612, ['Doll', 'Battery Powered', 'Baby'], true),
//             _createToy('Robot Toy', 82, ['Battery Powered', 'Baby'], true),
//             _createToy('YU-GI-OH Cards', 127, ['Art', 'Puzzle', 'Outdoor'], false),
//             _createToy('Lego', 16, ['Art', 'Puzzle', 'Baby'], true),
//             _createToy('Racing Car', 95, ['On wheels', 'Outdoor', 'Baby', 'Battery Powered'], false),
//         )
//         storageService.saveToStorage(STORAGE_KEY, toy)
//     }
// }

// function _createToy(name, price, labels, inStock) {
//     return {
//         _id: utilService.makeId(),
//         createdAt: utilService.getRandomPastYearTimestamp(),
//         name,
//         price,
//         labels,
//         inStock,
//     }
// }

// function _getSortedToys(toysToDisplay, sortBy) {
//     console.log('entered sorting')
//     toysToDisplay.sort(
//         (t1, t2) => {
//             const value1 = t1[sortBy.type]
//             const value2 = t2[sortBy.type]
//             return sortBy.desc * (typeof value1 === 'string' && typeof value2 === 'string' ? value2.localeCompare(value1) : value2 - value1)
//         }
//     )
// }