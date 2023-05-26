import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { showErrorMsg } from "../services/event-bus.service.js"
import { toyService } from "../services/toy.service.js"
import { saveToy } from "../store/toy.action.js"

import { LabelList } from "../cmps/label-list.jsx"



export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    function loadToy() {
        toyService.get(toyId)
            .then((toy) => setToyToEdit(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Cannot load toy')
            })
    }
    // ONLY ADD WORKS
    function handleChange({ target }) {
        console.log('target.value', target.value)
        const field = target.name
        const value = (target.type === 'number') ? (+target.value || '') :
            (target.type === 'checkbox') ? target.checked :
                target.value
        if (field === "labels") {
            const labelName = target.dataset.labelName
            if (value)
                setToyToEdit(prevToyEdit => ({
                    ...prevToyEdit,
                    [field]: prevToyEdit[field].includes(labelName) ? prevToyEdit[field] : [...prevToyEdit[field], labelName]
                }))
            else
                setToyToEdit(prevToyEdit => ({
                    ...prevToyEdit,
                    [field]: prevToyEdit[field].includes(labelName)
                        ? prevToyEdit[field].filter(item => item !== labelName)
                        : [...prevToyEdit[field]]
                }))
        }
        else {
            setToyToEdit(prevToyEdit => ({ ...prevToyEdit, [field]: value }))
        }
    }


    function handleAddToy(ev) {
        ev.preventDefault()
        saveToy(toyToEdit).then(() => navigate('/toy'))
    }



    const { labels, name, price, inStock } = toyToEdit
    return (
        <section className="toy-edit">
            <form action="">
                <section className="main-input">
                    <article>
                        <label>Name: </label>
                        <input type="text" name="name" placeholder="Enter toy name" value={name} onChange={handleChange} />
                    </article>
                    <article>
                        <label>Price: </label>
                        <input required type="number" name="price" placeholder="Enter price" onChange={handleChange} value={price} />
                    </article>
                    <article>
                        <label>In Stock: </label>
                        <input type="checkbox" name="inStock" value={inStock} onChange={handleChange} checked={inStock} />
                    </article>
                </section>
                <LabelList labels={labels} handleChange={handleChange} />
            </form>
            <button className="custom-button" onClick={(ev) => handleAddToy(ev)}>{toyId ? 'Edit' : 'Add'}</button>
        </section>
    )
}