import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

import { utilService } from '../services/util.service.js'
import { toyService } from "../services/toy.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"


export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        loadToy()
    }, [toyId])

    function loadToy() {
        toyService.get(toyId)
            .then((toy) => setToy(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }


    if (!toy) return <div>Loading...</div>

    const inStock = toy.inStock ? "Toy is in stock" : "Toy is out of stock"

    return <section className="toy-details">
        <Link className='custom-button' to={`/toy`}>Back</Link>
        <h1>Toy name : {toy.name}</h1>
        <h5>{inStock}</h5>
        <h5>Price: ${toy.price}</h5>
        <h5>{toy.labels.length > 0 && `Labels are: ${toy.labels}`}</h5>
        <h5>Toy was created: {utilService.formatTime(toy.createdAt)}</h5>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem, placeat perferendis tempora aspernatur sit, explicabo veritatis corrupti perspiciatis repellat, enim quibusdam!</p>
        <Link className="custom-button" to={`/toy/edit/${toy._id}`}>Edit</Link>
    </section>
}