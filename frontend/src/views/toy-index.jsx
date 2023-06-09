import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { toyService } from '../services/toy.service.js'
import { loadToys, removeToy } from '../store/toy.action.js'

import { ToyList } from '../cmps/toy-list.jsx'
import { ToyFilter } from '../cmps/toy-filter.jsx'
import { ToySort } from '../cmps/toy-sort.jsx'


export function ToyIndex() {
    // const dispatch = useDispatch()
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    const toys = useSelector(state => state.toyModule.toys)
    const [filterBy, setFilterBy] = useState({ ...toyService.getDefaultFilter() })
    const [sortBy, setSortBy] = useState({ type: 'createdAt', desc: 1 })



    useEffect(() => {
        loadToys(filterBy, sortBy)

        // return {

        // }
    }, [filterBy, sortBy])




    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                console.log('Cannot remove toy', err)
                showErrorMsg('Cannot remove toy')
            })
    }

    function onSetFilter(filterBy) {
        setFilterBy({ ...filterBy })
    }

    return (
        <section className="toy-index">
            {
                loggedinUser && loggedinUser.isAdmin &&
                <Link className="custom-button" to={`/toy/edit`}>Add Toy</Link>
            }
            <ToyFilter
                filterBy={filterBy}
                onSetFilter={onSetFilter}
            />
            <ToySort sortBy={sortBy} setSortBy={setSortBy} />
            <ToyList
                toys={toys}
                onRemoveToy={onRemoveToy}
                loggedinUser={loggedinUser}
            />
        </section >
    )
}