import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { utilService } from '../services/util.service.js'
import { toyService } from "../services/toy.service.js"


export function ToyDetails() {
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const [msg, setMsg] = useState(toyService.getEmptyMsg())
    const navigate = useNavigate()
    useEffect(() => {
        loadToy()
    }, [toy, msg])

    function loadToy() {
        toyService.get(toyId)
            .then((toy) => setToy(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
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


    function handleChange({ target }) {
        let { value, name: field, } = target
        setMsg((prevMsg) => ({ ...prevMsg, [field]: value }))
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

    const inStock = toy.inStock ? "Toy is in stock" : "Toy is out of stock"

    return (
        <section className="toy-details">
            <Link className='custom-button' to={`/toy`}>Back</Link>
            <h1>Toy name : {toy.name}</h1>
            <h5>{inStock}</h5>
            <h5>Price: ${toy.price}</h5>
            <h5>{toy.labels.length > 0 && `Labels are: ${toy.labels}`}</h5>
            <h5>Toy was created: {utilService.formatTime(toy.createdAt)}</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>

            <section className='toy-comments'>
                <form className="add-comment" onSubmit={onSaveMsg} >
                    <label htmlFor="addMsg">AddMsg</label>
                    <input id="addMsg"
                        type="text"
                        name="txt"
                        value={msg.txt}
                        onChange={handleChange}
                    />
                    <button>Add Msg</button>
                </form>
                <section className='list-comment'>
                    <h3>Comments</h3>
                    {toy.msgs.length > 0 && <ul>
                        {toy.msgs.map((msg, index) =>

                            <li key={index} className="">
                                {
                                    loggedinUser && loggedinUser.isAdmin &&
                                    <button onClick={(ev) => onRemoveMsg(ev, msg.id)}>X</button>
                                }
                                <span>{msg.by.fullname} : {msg.txt}</span>
                            </li>

                        )}
                    </ul>
                    }
                </section>
            </section>

            <Link className="custom-button" to={`/toy/edit/${toy._id}`}>Edit</Link>
        </section >
    )
}