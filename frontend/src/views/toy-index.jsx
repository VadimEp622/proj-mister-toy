import { useDispatch, useSelector } from 'react-redux'
import { loadToys, removeToy, saveToy } from '../store/toy.action.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toyService } from '../services/toy.service.js'


export function ToyIndex() {
    const toys = useSelector(state => state.toyModule.toys)
    // const [filterBy, setFilterBy] = useState(carService.getDefaultFilter())
    const dispatch = useDispatch()
    // const [sortBy, setSortBy] = useState({ type: '', desc: 1 })


    useEffect(() => {
        // add here sortby, filterby when we get there
        loadToys()
    }, [])

    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }

    // function onSetFilter(filterBy) {
    //     console.log('FilterBy', filterBy)
    //     setFilterBy(filterBy)
    // }

    return (
        <section className="toy-index">
            <Link to={`/toy/edit`}>Add Toy</Link>
            {/* <ToyFilter onSetFilter={onSetFilter} /> */}
            <ToyList
                toys={toys}
                // sortBy={sortBy}
                // setSortBy={setSortBy}
                onRemoveToy={onRemoveToy}
            />
        </section >
    )
}