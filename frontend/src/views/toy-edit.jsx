import { toyService } from "../services/toy.service.js"

import { UPDATE_IS_EDIT } from "../store/toy.reducer.js"
import { saveToy } from "../store/toy.actions.js"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const { toyId } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        loadToy()
    }, [toyToEdit])

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => setToyToEdit(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }


    function handleChange({ target }) {
        console.log('target.value', target.value)
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setToyToEdit(prevToyEdit => ({ ...prevToyEdit, [field]: value }))
    }

    function handleAddToy(ev) {
        ev.preventDefault()
        const toy = {
            ...toyToEdit,
            createdAt: Date.now(),
        }
        saveToy(toy)
            .then(() => {
                dispatch({ type: UPDATE_IS_EDIT, isEdit: false })
            })
    }

    const { labels } = toyEdit
    return (
        <section className="toy-edit">
            <form action="">
                <input type="text" name="text" placeholder="Enter toy name" value={toyEdit.name} onChange={handleChange} ></input>
                <input required onChange={handleChange} value={toyEdit.price} type="number" name={toyEdit.price} placeholder="Enter price" />
                <input type="checkbox" name={toyEdit.inStock} value={toyEdit.inStock} >in stock</input>
                <section className="labels-input">
                    <input type="checkbox" name="On wheels" value={toyEdit.inStock} checked={labels.includes('On wheels')} > On wheels</input>
                    <input type="checkbox" name="Box game" value={toyEdit.inStock} checked={labels.includes('Box game')} > Box game</input>
                    <input type="checkbox" name="Art" value={toyEdit.inStock} checked={labels.includes('Art')} > Art</input>
                    <input type="checkbox" name="Baby" value={toyEdit.inStock} checked={labels.includes('Baby')} > Baby</input>
                    <input type="checkbox" name="Doll" value={toyEdit.inStock} checked={labels.includes('Doll')} > Doll</input>
                    <input type="checkbox" name="Puzzle" value={toyEdit.inStock} checked={labels.includes('Puzzle')} > Puzzle</input>
                    <input type="checkbox" name="Outdoor" value={toyEdit.inStock} checked={labels.includes('Outdoor')} > Outdoor</input>
                    <input type="checkbox" name="Battery Powered" value={toyEdit.inStock} checked={labels.includes('Battery Powered')} > Battery Powered</input>
                </section>
            </form>
            <button onClick={(ev) => handleAddToy(ev)}>Add</button>
            {/* <button>{ToyToEditRef.id ? 'Save' : 'Add'}</button> */}

        </section>
    )
}