import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { utilService } from '../services/util.service.js'
import { toyService } from "../services/toy.service.js"

import { ToyMsg } from '../cmps/toy-msg.jsx'
import { ToyReview } from '../cmps/toy-review.jsx'
import { ToyChat } from '../cmps/toy-chat.jsx'


export function ToyDetails() {
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const [msg, setMsg] = useState(toyService.getEmptyMsg())

    const navigate = useNavigate()


    useEffect(() => {
        if (!toy) loadToy()
    }, [toy, msg])

    useEffect(() => {
        loadToy()
    }, [msg])


    function loadToy() {
        toyService.get(toyId)
            .then((toy) => {
                setToy(toy)
            })
            .catch((err) => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }

    function handleChange({ target }) {
        let { value, name: field, } = target
        setMsg((prevMsg) => ({ ...prevMsg, [field]: value }))
    }

    async function onSaveMsg(ev) {
        ev.preventDefault()
        try {
            console.log('Msg saved:', msg)
            await toyService.addToyMsg(toyId, msg)
            setMsg(toyService.getEmptyMsg())
            showSuccessMsg('Msg saved')

        } catch (err) {
            console.log('Cannot save Msg', err)
            showErrorMsg('Cannot save Msg')
        }
    }

    async function onRemoveMsg(ev, msgId) {
        ev.preventDefault()
        try {
            await toyService.removeToyMsg(toyId, msgId)
            showSuccessMsg('Deleted Successfully')
        } catch (err) {
            console.log('Cannot delete message')
            showErrorMsg('Cannot delete message', err)
        }
    }




    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <Link className='custom-button' to={`/toy`}>Back</Link>
            <article className="details">
                <h2>Toy name : {toy.name}</h2>
                <h4 className={`is-stock ${toy.inStock ? 'in-stock' : 'not-in-stock'}`}>{`Toy is ${toy.inStock ? 'in' : 'Out Of'} Stock`}</h4>
                <h4>Price: ${toy.price}</h4>
                <h4>{toy.labels.length > 0 && `Labels: ${toy.labels.join(', ')}`}</h4>
                <h4>Created: {utilService.formatTime(toy.createdAt)}</h4>
            </article>

            <Link className="custom-button" to={`/toy/edit/${toy._id}`}>Edit</Link>

            <ToyMsg
                toy={toy}
                loggedinUser={loggedinUser}
                onSaveMsg={onSaveMsg}
                onRemoveMsg={onRemoveMsg}
                msg={msg}
                handleChange={handleChange}
            />

            <ToyReview
                toy={toy}
                loggedinUser={loggedinUser}
            />

            <ToyChat
                toy={toy}
                loggedinUser={loggedinUser}
            />

        </section >
    )
}