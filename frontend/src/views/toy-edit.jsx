import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { showErrorMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/toy.action.js"
import { toyService } from "../services/toy.service.js"




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

    // function handleCheckboxChange({ target }) {
    //     const field = target.name
    //     const value = target.checked === 'true' ? true : target.checked === 'false' ? false : false
    //     setToyToEdit(prevToyEdit => ({ ...prevToyEdit, [field]: value }))
    // }


    function handleAddToy(ev) {
        ev.preventDefault()
        saveToy(toyToEdit).then(() => navigate('/toy'))

    }

    const { labels, name, price, inStock } = toyToEdit
    return (
        <section className="toy-edit">
            <form action="">
                <article>
                    <label>Name:</label>
                    <input type="text" name="text" name="name" placeholder="Enter toy name" value={name} onChange={handleChange} />
                </article>
                <article>
                    <label>Price:</label>
                    <input required type="number" name="price" placeholder="Enter price" onChange={handleChange} value={price} />
                </article>
                <article>
                    <input type="checkbox" name="inStock" value={inStock} onChange={handleChange} checked={inStock} />
                    <label>Toy In Stock</label>
                </article>
                <section className="labels-input">
                    <h4>Labels:</h4>
                    <article>
                        <input type="checkbox" name="labels" data-label-name="On wheels" value={labels.includes('On wheels')} checked={labels.includes('On wheels')} onChange={handleChange} />
                        <label>On wheels</label>
                    </article>
                    <article>
                        <input type="checkbox" name="labels" data-label-name="Box game" value={labels.includes('Box game')} checked={labels.includes('Box game')} onChange={handleChange} />
                        <label>Box game</label>
                    </article>
                    <article>
                        <input type="checkbox" name="labels" data-label-name="Art" value={labels.includes('Art')} checked={labels.includes('Art')} onChange={handleChange} />
                        <label>Art</label>
                    </article>
                    <article>
                        <input type="checkbox" name="labels" data-label-name="Baby" value={labels.includes('Baby')} checked={labels.includes('Baby')} onChange={handleChange} />
                        <label>Baby</label>
                    </article>
                    <article>
                        <input type="checkbox" name="labels" data-label-name="Doll" value={labels.includes('Doll')} checked={labels.includes('Doll')} onChange={handleChange} />
                        <label>Doll</label>
                    </article>
                    <article>
                        <input type="checkbox" name="labels" data-label-name="Puzzle" value={labels.includes('Puzzle')} checked={labels.includes('Puzzle')} onChange={handleChange} />
                        <label>Puzzle</label>
                    </article>
                    <article>
                        <input type="checkbox" name="labels" data-label-name="Outdoor" value={labels.includes('Outdoor')} checked={labels.includes('Outdoor')} onChange={handleChange} />
                        <label>Outdoor</label>
                    </article>
                    <article>
                        <input type="checkbox" name="labels" data-label-name="Battery Powered" value={labels.includes('Battery Powered')} checked={labels.includes('Battery Powered')} onChange={handleChange} />
                        <label>Battery Powered</label>
                    </article>
                </section>
            </form>
            <button onClick={(ev) => handleAddToy(ev)}>Add</button>
            {/* <button>{ToyToEditRef.id ? 'Save' : 'Add'}</button> */}

        </section>
    )
}