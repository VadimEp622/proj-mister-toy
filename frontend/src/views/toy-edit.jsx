import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { toyService } from "../services/toy.service.js"
import { saveToy } from "../store/toy.action.js"

import { ToyEditForm } from "../cmps/toy-edit-form.jsx"




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
        console.log('hi')
    }

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


    function onSubmit(events) {
        console.log('events', events)
        const newToy = { ...toyToEdit, ...events }
        console.log('newToy', newToy)
        saveToy(newToy)
            .then(() => {
                showSuccessMsg('Toy Saved')
                navigate('/toy')
            })
            .catch((err) => {
                console.log('Cannot Save', err)
                showErrorMsg('Cannot Save')
            })
            .finally(navigate('/toy'))
    }


    const { labels, name, price, inStock } = toyToEdit
    const formValues = {
        name,
        price,
        inStock
    }
    return (
        <section className="toy-edit">
            <Link className='custom-button' to={`/toy`}>Back</Link>
            <ToyEditForm
                formValues={formValues}
                onSubmit={onSubmit}
                toyId={toyId}
                labels={labels}
                handleChange={handleChange} />
        </section>
    )
}
