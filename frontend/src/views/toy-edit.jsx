import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { showErrorMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/toy.action.js"
import { toyService } from "../services/toy.service.js"





export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()
    // const navigate = useNavigate()


    useEffect(() => {
        loadToy()
    }, [toyToEdit])

    function loadToy() {
        toyService.get(toyId)
            .then((toy) => setToyToEdit(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Cannot load toy')
                // navigate('/toy')
            })
    }

    function handleChange({ target }) {
        console.log('target.value', target.value)
        const field = target.name
        const value = (target.type === 'number') ? (+target.value || '') :
            (target.type === 'checkbox') ? (target.checked === 'true') :
                target.value
        setToyToEdit(prevToyEdit => ({ ...prevToyEdit, [field]: value }))
    }

    function handleAddToy(ev) {
        ev.preventDefault()
        saveToy(toyToEdit)
    }

    const { labels, name, price, inStock } = toyToEdit
    return (
        <section className="toy-edit">
            <form action="">
                <article>
                    <label>Name:</label>
                    <input type="text" name="text" placeholder="Enter toy name" value={name} onChange={handleChange} />
                </article>
                <article>
                    <label>Price:</label>
                    <input required onChange={handleChange} value={price} type="number" name={price} placeholder="Enter price" />
                </article>
                <article>
                    <input type="checkbox" name="isStock" value={inStock} />
                    <label>Toy In Stock</label>
                </article>
                <section className="labels-input">
                    <h4>Labels:</h4>
                    <article>
                        <input type="checkbox" name="On wheels" value="On wheels" checked={labels.includes('On wheels')} onChange={handleChange} />
                        <label>On wheels</label>
                    </article>
                    <article>
                        <input type="checkbox" name="Box game" value="Box game" checked={labels.includes('Box game')} onChange={handleChange} />
                        <label>Box game</label>
                    </article>
                    <article>
                        <input type="checkbox" name="Art" value="Art" checked={labels.includes('Art')} onChange={handleChange} />
                        <label>Art</label>
                    </article>
                    <article>
                        <input type="checkbox" name="Baby" value="Baby" checked={labels.includes('Baby')} onChange={handleChange} />
                        <label>Baby</label>
                    </article>
                    <article>
                        <input type="checkbox" name="Doll" value="Doll" checked={labels.includes('Doll')} onChange={handleChange} />
                        <label>Doll</label>
                    </article>
                    <article>
                        <input type="checkbox" name="Puzzle" value="Puzzle" checked={labels.includes('Puzzle')} onChange={handleChange} />
                        <label>Puzzle</label>
                    </article>
                    <article>
                        <input type="checkbox" name="Outdoor" value="Outdoor" checked={labels.includes('Outdoor')} onChange={handleChange} />
                        <label>Outdoor</label>
                    </article>
                    <article>
                        <input type="checkbox" name="Battery Powered" value="Battery Powered" checked={labels.includes('Battery Powered')} onChange={handleChange} />
                        <label>Battery Powered</label>
                    </article>
                </section>
            </form>
            <button onClick={(ev) => handleAddToy(ev)}>Add</button>
            {/* <button>{ToyToEditRef.id ? 'Save' : 'Add'}</button> */}

        </section>
    )
}