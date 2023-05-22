import { Link } from 'react-router-dom'
import { ToyPreview } from './toy-preview.jsx'


export function ToyList({ toys, onRemoveToy }) {
    // if (!toys.length) {
    //     return <span className="loading-notice">No toys to show..</span>
    // }

    return (
        <section className="toys-list">
            {
                (toys.length > 0) ? (
                    toys.map(toy => (
                        <section className="toy-card" key={toy._id}>

                            <article className="preview-text">
                                <ToyPreview toy={toy} />
                            </article>

                            <section className="card-menu">
                                <article>
                                    <Link to={`/toy/details/${toy._id}`}>Details</Link>
                                </article>

                                <article>
                                    <Link to={`/toy/edit/${toy._id}`}>Edit Toy</Link>
                                </article>

                                <article>
                                    <button onClick={(ev) => onRemoveToy(ev, toy._id)}>Remove</button>
                                </article>
                            </section>


                        </section>
                    ))
                ) : (<span className="no-toys-notice">No Toys Available</span>)
            }
        </section>
    )
}