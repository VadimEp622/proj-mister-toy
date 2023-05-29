import { httpService } from './http.service.js'

const BASE_URL = 'review/'

export const reviewService = {
    query,
    save,
    remove,
}


function query(filterBy = { toyId: '' }) {
    console.log('filterBy', filterBy)
    return httpService.get(BASE_URL, filterBy)
}

function save(review) {
    const method = review._id ? 'put' : 'post'
    return httpService[method](BASE_URL + ((review._id) ? review._id : ''), review)
}

function remove(reviewId) {
    return httpService.delete(BASE_URL + reviewId)
}