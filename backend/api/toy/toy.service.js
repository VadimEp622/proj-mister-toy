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
            name: toy.name,
            price: toy.price,
            labels: [...toy.labels],
            inStock: toy.inStock
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