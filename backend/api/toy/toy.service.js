const { ObjectId } = require('mongodb')

const utilService = require('../../services/util.service')
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')

module.exports = {
    query,
    remove,
    getById,
    add,
    update,
    addToyMsg,
    removeToyMsg,
}

async function query(filterBy = { name: '', maxPrice: '', inStock: '', labels: [''] }, sortBy = { type: 'createdAt', desc: 1 }) {
    try {
        console.log('filterBy.labels', filterBy.labels)
        const criteria = {
            $and: [
                { name: { $regex: filterBy.name, $options: 'i' } },
                { price: !filterBy.maxPrice ? { $gte: 0 } : { $lte: +filterBy.maxPrice } },
                { inStock: filterBy.inStock === 'true' ? { $eq: true } : { $exists: true } },
            ]
        }
        if (filterBy.labels && filterBy.labels.length > 0) {
            criteria.labels = { $all: filterBy.labels }
        }


        const collection = await dbService.getCollection('toy')
        let toys = await collection.find(criteria).toArray()


        if (sortBy.type === 'name') toys.sort((a, b) => (-sortBy.desc) * a.name.localeCompare(b.name))
        else toys.sort((a, b) => (-sortBy.desc) * (a[sortBy.type] - b[sortBy.type]))


        return toys
    } catch (err) {
        logger.error('cannot find toys', err)
        throw err
    }
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = collection.findOne({ _id: ObjectId(toyId) })
        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.deleteOne({ _id: ObjectId(toyId) })
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function add(toy) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.insertOne(toy)
        return toy
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}

async function update(toy) {
    try {
        const toyToSave = {
            vendor: toy.vendor,
            price: toy.price,
        }
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ _id: ObjectId(toy._id) }, { $set: toyToSave })
        return toy
    } catch (err) {
        logger.error(`cannot update toy ${toy._id}`, err)
        throw err
    }
}

async function addToyMsg(toyId, msg) {
    try {
        msg.id = utilService.makeId()
        const collection = await dbService.getCollection('toy')
        await collection.updateOne(
            { _id: ObjectId(toyId) },
            { $push: { msgs: msg } }
        )
        return msg
    } catch (err) {
        logger.error(`cannot add toy msg ${toy._id}`, err)
        throw err
    }
}

async function removeToyMsg(toyId, msgId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.updateOne(
            { _id: ObjectId(toyId) },
            { $pull: { msgs: { id: msgId } } }
        )
        return msgId
    } catch (err) {
        logger.error(`cannot add toy msg ${toy._id}`, err)
        throw err
    }
}










// const fs = require('fs')
// var toys = require('../data/toy.json')

// module.exports = {
// query,
// get,
// remove,
// save
// }

// function query(filterBy = {}, sortBy = {}) {
//     let toysToDisplay = toys
//     const parsedInStock = (filterBy.inStock !== undefined && filterBy.inStock !== '') ? JSON.parse(filterBy.inStock) : undefined;


//     if (filterBy.name) {
//         const regExp = new RegExp(filterBy.name, 'i')
//         toysToDisplay = toysToDisplay.filter(toy => regExp.test(toy.name))
//     }
//     if (filterBy.maxPrice) {
//         toysToDisplay = toysToDisplay.filter(toy => toy.price <= filterBy.maxPrice)
//     }
//     if (parsedInStock) {
//         toysToDisplay = toysToDisplay.filter(toy => toy.inStock === parsedInStock)
//     }
//     if (filterBy.labels && filterBy.labels.length > 0) {
//         const labels = Array.isArray(filterBy.labels) ? filterBy.labels : filterBy.labels.split(',')
//         toysToDisplay = toysToDisplay.filter(toy => labels.every(l => toy.labels.includes(l)))
//     }


//     if (sortBy.type === 'name') toysToDisplay.sort((a, b) => (-sortBy.desc) * a.name.localeCompare(b.name))
//     else toysToDisplay.sort((a, b) => (-sortBy.desc) * (a[sortBy.type] - b[sortBy.type]))


//     return Promise.resolve(toysToDisplay)
// }

// function get(toyId) {
//     const toy = toys.find(toy => toy._id === toyId)
//     if (!toy) return Promise.reject('Toy not found!')
//     return Promise.resolve(toy)
// }

// function remove(toyId) {
//     const idx = toys.findIndex(toy => toy._id === toyId)
//     if (idx === -1) return Promise.reject('No Such Toy')
//     const toy = toys[idx]
//     // if (toy.owner._id !== loggedinUser._id) return Promise.reject('Not your toy')
//     toys.splice(idx, 1)
//     return _saveToysToFile()

// }

// function save(toy) {
//     if (toy._id) {
//         const toyToUpdate = toys.find(currToy => currToy._id === toy._id)
//         // if (toyToUpdate.owner._id !== loggedinUser._id) return Promise.reject('Not your toy')
//         toyToUpdate.name = toy.name
//         toyToUpdate.price = toy.price
//         toyToUpdate.labels = toy.labels
//         toyToUpdate.inStock = toy.inStock
//         console.log('toy -> from BACKEND toy.service', toy)

//     } else {
//         toy._id = _makeId()
//         // toy.owner = loggedinUser
//         toys.push(toy)
//     }

//     return _saveToysToFile().then(() => toy)
//     // return Promise.resolve(toy)
// }

// function _makeId(length = 5) {
//     let text = '';
//     const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     for (let i = 0; i < length; i++) {
//         text += possible.charAt(Math.floor(Math.random() * possible.length));
//     }
//     return text;
// }

// function _saveToysToFile() {
//     return new Promise((resolve, reject) => {

//         const toysStr = JSON.stringify(toys, null, 2)
//         fs.writeFile('data/toy.json', toysStr, (err) => {
//             if (err) {
//                 return console.log(err);
//             }
//             console.log('The file was saved!');
//             resolve()
//         })
//     })
// }