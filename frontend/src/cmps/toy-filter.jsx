import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"
import { LabelSelector } from "./label-select.jsx"

export function ToyFilter({ onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(toyService.getDefaultFilter())
    onSetFilter = useRef(utilService.debounce(onSetFilter))
    const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
        'Outdoor', 'Battery Powered']

    const elInputRef = useRef(null)

    useEffect(() => {
        elInputRef.current.focus()
    }, [])

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const { name: field, type, checked } = target
        const value = (type === 'number') ? (+target.value || '') :
            (type === 'checkbox') ? checked :
                target.value
        console.log(target.value)
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onLabelChange(selectedLabels) {
        setFilterByToEdit((prevFilter) => ({
            ...prevFilter,
            labels: selectedLabels,
        }))
    }


    function onSubmitFilter(ev) {
        // update father cmp that filters change on submit
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    const { name, maxPrice, inStock } = filterByToEdit
    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter</h2>
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="name">Name:</label>
                <input type="text"
                    id="name"
                    name="name"
                    placeholder="By name"
                    value={name}
                    onChange={handleChange}
                    ref={elInputRef}
                />

                <label htmlFor="maxPrice">Max price:</label>
                <input type="number"
                    id="maxPrice"
                    name="maxPrice"
                    placeholder="By max price"
                    value={maxPrice}
                    onChange={handleChange}
                />

                <label htmlFor="inStock">In Stock:</label>
                <input type="checkbox" name="inStock" id="inStock" onChange={handleChange} value={inStock} />
                <button>Filter</button>

                <LabelSelector labels={labels} onLabelChange={onLabelChange} />
            </form>

        </section>
    )
}