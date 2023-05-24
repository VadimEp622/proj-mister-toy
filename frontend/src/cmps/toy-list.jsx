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
                                <article className="btn-details-container">
                                    <Link className="custom-button" to={`/toy/details/${toy._id}`}>Details</Link>
                                </article>

                                <article className="btn-edit-container">
                                    <Link className="custom-button" to={`/toy/edit/${toy._id}`}>Edit Toy</Link>
                                </article>

                                <article className="btn-remove-container">
                                    <button className="custom-button" onClick={() => onRemoveToy(toy._id)}>Remove</button>
                                </article>
                            </section>


                        </section>
                    ))
                ) : (<span className="no-toys-notice">No Toys Available</span>)
            }
        </section>
    )
}