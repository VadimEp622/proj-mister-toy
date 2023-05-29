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

async function query(filterBy, sortBy) {
    try {
        // console.log('filterBy', filterBy)
        // console.log('sortBy', sortBy)
        const criteria = _setCriteria(filterBy)

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
        const toy = collection.findOne({ _id: new ObjectId(toyId) })
        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.deleteOne({ _id: new ObjectId(toyId) })
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
        await collection.updateOne({ _id: new ObjectId(toy._id) }, { $set: toyToSave })
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
            { _id: new ObjectId(toyId) },
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
            { _id: new ObjectId(toyId) },
            { $pull: { msgs: { id: msgId } } }
        )
        return msgId
    } catch (err) {
        logger.error(`cannot add toy msg ${toy._id}`, err)
        throw err
    }
}



// ***************** PRIVATE FUNCTIONS ***************** 
function _setCriteria(filterBy) {
    const criteria = {}
    if (filterBy.name)
        criteria.name = { $regex: filterBy.name, $options: 'i' }
    if (filterBy.maxPrice)
        criteria.price = { $lte: filterBy.maxPrice }
    if (filterBy.inStock)
        criteria.inStock = true
    if (filterBy.labels)
        criteria.labels = { $all: filterBy.labels }
    return criteria
}










// const fs = require('fs')
// var toys = require('../data/toy.json')

// module.exports = {
// get,
// remove,
// save
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