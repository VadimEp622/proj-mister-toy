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

    // function onAddToy() {
    //     const toyToSave = carService.getEmptyToy()
    //     saveCar(toyToSave)
    //         .then((savedCar) => {
    //             showSuccessMsg(`Car added (id: ${savedCar._id})`)
    //         })
    //         .catch(err => {
    //             showErrorMsg('Cannot add car')
    //         })
    // }

    // function onSetFilter(filterBy) {
    //     console.log('FilterBy', filterBy)
    //     setFilterBy(filterBy)
    // }

    return (
        <section className="toy-index">
            <Link to={`/toy/edit`}>Add Car</Link>
            {/* <CarFilter onSetFilter={onSetFilter} /> */}
            {isLoading && <h4>Loading...</h4>}
            <ToyList
                toys={toys}
                // sortBy={sortBy}
                // setSortBy={setSortBy}
                onRemoveToy={onRemoveToy}
            />
        </section >
    )
}