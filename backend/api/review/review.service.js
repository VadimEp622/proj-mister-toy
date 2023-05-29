const dbService = require('../../services/db.service')
const { logger } = require('../../services/logger.service')
const { asyncLocalStorage } = require('../../services/als.service')
const { ObjectId } = require('mongodb')

module.exports = {
    query,
    remove,
    add
}

query()

// filterBy= { byUserId: ObjectId(user._id) }
async function query(filterBy = {}) {
    try {
        // criteria = {byUserId: ObjectId(user._id) }
        // const criteria = _buildCriteria(filterBy)
        const filter = { userId: new ObjectId("6473b03515e04ba8246afc26") }
        const criteria = _buildCriteria(filter)
        const collection = await dbService.getCollection('review')
        var reviews = await collection.aggregate([
            {
                $match: criteria//{byUserId: ObjectId(user._id) }
            },
            {
                $lookup:
                {
                    from: 'user',//<collection to join>
                    localField: 'userId',//<field from the input documents> ----> is a key inside a toy object
                    foreignField: '_id',//<field from the documents of the "from" collection>
                    as: 'byUser'//<output array field>
                }
            },
            {
                $unwind: '$byUser'
            },
            {
                $lookup:
                {
                    from: 'toy',//<collection to join>
                    localField: 'toyId',//<field from the input documents> ----> is a key inside a toy object
                    foreignField: '_id',//<field from the documents of the "from" collection>
                    as: 'aboutToy'//<output array field>
                }
            },
            {
                $unwind: '$aboutToy'
            }
        ]).toArray()
        // console.log('reviews', reviews)
        reviews = reviews.map(review => {
            review._id = review._id.toString()
            review.byUser = { _id: review.byUser._id.toString(), fullname: review.byUser.fullname }
            review.aboutToy = { _id: review.aboutToy._id.toString(), name: review.aboutToy.name, price: review.aboutToy.price }
            delete review.userId
            delete review.toyId
            return review
        })
        console.log('reviews', reviews)

        return reviews
    } catch (err) {
        logger.error('cannot find reviews', err)
        throw err
    }

}

async function remove(reviewId) {
    try {
        const store = asyncLocalStorage.getStore()
        const { loggedinUser } = store
        const collection = await dbService.getCollection('review')
        // remove only if user is owner/admin
        const criteria = { _id: ObjectId(reviewId) }
        if (!loggedinUser.isAdmin) criteria.byUserId = ObjectId(loggedinUser._id)
        const { deletedCount } = await collection.deleteOne(criteria)
        return deletedCount
    } catch (err) {
        logger.error(`cannot remove review ${reviewId}`, err)
        throw err
    }
}


async function add(review) {
    try {
        const reviewToAdd = {
            byUserId: ObjectId(review.byUserId),
            aboutUserId: ObjectId(review.aboutUserId),
            txt: review.txt
        }
        const collection = await dbService.getCollection('review')
        await collection.insertOne(reviewToAdd)
        return reviewToAdd
    } catch (err) {
        logger.error('cannot insert review', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.userId) criteria.userId = filterBy.userId
    return criteria
}




