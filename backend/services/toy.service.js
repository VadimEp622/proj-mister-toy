const fs = require('fs')
var toys = require('../data/toy.json')

function query(filterBy = {}, sortBy = {}) {
    let toysToDisplay = toys
    const parsedInStock = (filterBy.inStock !== undefined && filterBy.inStock !== '') ? JSON.parse(filterBy.inStock) : undefined;


    if (filterBy.name) {
        const regExp = new RegExp(filterBy.name, 'i')
        toysToDisplay = toysToDisplay.filter(toy => regExp.test(toy.name))
    }
    if (filterBy.maxPrice) {
        toysToDisplay = toysToDisplay.filter(toy => toy.price <= filterBy.maxPrice)
    }
    if (parsedInStock) {
        toysToDisplay = toysToDisplay.filter(toy => toy.inStock === parsedInStock)
    }
    if (filterBy.labels && filterBy.labels.length > 0) {
        const labels = Array.isArray(filterBy.labels) ? filterBy.labels : filterBy.labels.split(',')
        toysToDisplay = toysToDisplay.filter(toy => labels.every(l => toy.labels.includes(l)))
    }


    if (sortBy.type === 'name') toysToDisplay.sort((a, b) => (-sortBy.desc) * a.name.localeCompare(b.name))
    else toysToDisplay.sort((a, b) => (-sortBy.desc) * (a[sortBy.type] - b[sortBy.type]))


    return Promise.resolve(toysToDisplay)
}

function get(toyId) {
    const toy = toys.find(toy => toy._id === toyId)
    if (!toy) return Promise.reject('Toy not found!')
    return Promise.resolve(toy)
}

function remove(toyId) {
    const idx = toys.findIndex(toy => toy._id === toyId)
    if (idx === -1) return Promise.reject('No Such Toy')
    const toy = toys[idx]
    // if (toy.owner._id !== loggedinUser._id) return Promise.reject('Not your toy')
    toys.splice(idx, 1)
    return _saveToysToFile()

}

function save(toy) {
    if (toy._id) {
        const toyToUpdate = toys.find(currToy => currToy._id === toy._id)
        // if (toyToUpdate.owner._id !== loggedinUser._id) return Promise.reject('Not your toy')
        toyToUpdate.name = toy.name
        toyToUpdate.price = toy.price
        toyToUpdate.labels = toy.labels
        toyToUpdate.inStock = toy.inStock
        console.log('toy -> from BACKEND toy.service', toy)

    } else {
        toy._id = _makeId()
        // toy.owner = loggedinUser
        toys.push(toy)
    }

    return _saveToysToFile().then(() => toy)
    // return Promise.resolve(toy)
}

function _makeId(length = 5) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function _saveToysToFile() {
    return new Promise((resolve, reject) => {

        const toysStr = JSON.stringify(toys, null, 2)
        fs.writeFile('data/toy.json', toysStr, (err) => {
            if (err) {
                return console.log(err);
            }
            console.log('The file was saved!');
            resolve()
        });
    })
}

module.exports = {
    query,
    get,
    remove,
    save
}