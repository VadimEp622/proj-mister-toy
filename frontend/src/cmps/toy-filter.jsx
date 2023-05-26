import { useEffect, useRef, useState } from "react"

import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"

import { LabelList } from "./label-list.jsx"


export function ToyFilter({ onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(toyService.getDefaultFilter())
    onSetFilter = useRef(utilService.debounce(onSetFilter))


    const elInputRef = useRef(null)

    useEffect(() => {
        elInputRef.current.focus()
    }, [])

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        const value = (target.type === 'number')
            ? (+target.value || '')
            : (target.type === 'checkbox')//if not number, ask if checkbox
                ? target.checked
                : target.value

        if (field === "labels") {
            const labelName = target.dataset.labelName
            if (value)
                setFilterByToEdit(prevFilter => ({
                    ...prevFilter,
                    [field]: prevFilter[field].includes(labelName)
                        ? prevFilter[field]
                        : [...prevFilter[field], labelName]
                }))
            else
                setFilterByToEdit(prevFilter => ({
                    ...prevFilter,
                    [field]: prevFilter[field].includes(labelName)
                        ? prevFilter[field].filter(item => item !== labelName)
                        : [...prevFilter[field]]
                }))
        }
        else {
            setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
        }
    }




    function onSubmitFilter(ev) {
        // update father cmp that filters change on submit
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    const { name, maxPrice, inStock, labels } = filterByToEdit
    return (
        <section className="toy-filter">
            <h2>Toys Filter</h2>
            <form onSubmit={onSubmitFilter}>
                <section className="main-input">
                    <article>
                        <label htmlFor="name">Name: </label>
                        <input type="text"
                            id="name"
                            name="name"
                            placeholder="By name"
                            value={name}
                            onChange={handleChange}
                            ref={elInputRef}
                        />
                    </article>
                    <article>
                        <label htmlFor="maxPrice">Max price: </label>
                        <input type="number"
                            id="maxPrice"
                            name="maxPrice"
                            placeholder="By max price"
                            value={maxPrice}
                            onChange={handleChange}
                        />
                    </article>
                    <article>
                        <label htmlFor="inStock">In Stock: </label>
                        <input type="checkbox" name="inStock" id="inStock" onChange={handleChange} value={inStock} />
                    </article>
                </section >
                <LabelList labels={labels} handleChange={handleChange} />
            </form>

        </section>
    )
}