import { useDispatch, useSelector } from 'react-redux'
import { loadToys, removeToy, saveToy } from '../store/toy.action.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toyService } from '../services/toy.service.js'
import { ToyList } from '../cmps/toy-list.jsx'
import { ToyFilter } from '../cmps/toy-filter.jsx'
import { ToySort } from '../cmps/toy-sort.jsx'


export function ToyIndex() {
    const toys = useSelector(state => state.toyModule.toys)
    const [filterBy, setFilterBy] = useState(toyService.getDefaultFilter())
    const dispatch = useDispatch()
    const [sortBy, setSortBy] = useState({ type: '', desc: 1 })


    useEffect(() => {
        loadToys(filterBy)
    }, [filterBy])

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    return (
        <section className="toy-index">
            <Link to={`/toy/edit`}>Add Toy</Link>
            <ToyFilter onSetFilter={onSetFilter} />
            <ToySort sortBy={sortBy} setSortBy={setSortBy} />
            <ToyList
                toys={toys}
                onRemoveToy={onRemoveToy}
            />
        </section >
    )
}