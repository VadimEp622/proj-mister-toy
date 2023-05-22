import { toyService } from "../services/toy.service.js"

import { UPDATE_IS_EDIT } from "../store/toy.reducer.js"
import { saveToy } from "../store/toy.actions.js"

const { useState } = React

export function ToyEdit({ dispatch, toyToEditRef }) {
    const [toyEdit, setToyEdit] = useState(toyToEditRef.current ? toyToEditRef.current : toyService.getEmptyToy())


    function handleChange({ target }) {
        console.log('target.value', target.value)
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setToyEdit(prevToyEdit => ({ ...prevToyEdit, [field]: value }))
    }

    function handleAddToy(ev) {
        ev.preventDefault()
        const toy = {
            ...toyEdit,
            createdAt: Date.now(),
        }
        saveToy(toy)
            .then(() => {
                dispatch({ type: UPDATE_IS_EDIT, isEdit: false })
                toyToEditRef.current = null//finish current edit session
            })
    }


    return (
        <section className="toy-edit">
            <input
                type="text"
                name="text"
                placeholder="What needs to be done?"
                value={toyEdit.text}
                onChange={handleChange}
            ></input>
            <button onClick={(ev) => handleAddToy(ev)}>Add</button>
        </section>
    )
}