import { toyService } from "../services/toy.service.js"

// import { UPDATE_IS_EDIT } from "../store/toy.reducer.js"
// import { saveToy } from "../store/toy.actions.js"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { showErrorMsg } from "../services/event-bus.service.js"


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
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setToyToEdit(prevToyEdit => ({ ...prevToyEdit, [field]: value }))
    }

    // function handleCheckBoxChange({ target }, str) {
    //     labels.includes(str)
    // }

    function handleAddToy(ev) {
        ev.preventDefault()
        // saveToy(toyToEdit)
    }

    const { labels, name, price, inStock } = toyToEdit
    return (
        <section className="toy-edit">
            <form action="">
                <input type="text" name="text" placeholder="Enter toy name" value={name} onChange={handleChange} ></input>
                <input required onChange={handleChange} value={price} type="number" name={price} placeholder="Enter price" />
                <input type="checkbox" name={inStock} value={inStock} >in stock</input>
                <section className="labels-input">
                    <input type="checkbox" name="On wheels" checked={labels.includes('On wheels')} > On wheels</input>
                    <input type="checkbox" name="Box game" checked={labels.includes('Box game')} > Box game</input>
                    <input type="checkbox" name="Art" checked={labels.includes('Art')} > Art</input>
                    <input type="checkbox" name="Baby" checked={labels.includes('Baby')} > Baby</input>
                    <input type="checkbox" name="Doll" checked={labels.includes('Doll')} > Doll</input>
                    <input type="checkbox" name="Puzzle" checked={labels.includes('Puzzle')} > Puzzle</input>
                    <input type="checkbox" name="Outdoor" checked={labels.includes('Outdoor')} > Outdoor</input>
                    <input type="checkbox" name="Battery Powered" checked={labels.includes('Battery Powered')} > Battery Powered</input>
                </section>
            </form>
            <button onClick={(ev) => handleAddToy(ev)}>Add</button>
            {/* <button>{ToyToEditRef.id ? 'Save' : 'Add'}</button> */}

        </section>
    )
}