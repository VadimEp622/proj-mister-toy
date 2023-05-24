import { Link } from 'react-router-dom'
import { ToyPreview } from './toy-preview.jsx'


export function ToyList({ toys, onRemoveToy }) {
    // if (!toys.length) {
    //     return <span className="loading-notice">No toys to show..</span>
    // }

    return (
        <section className="toy-list">
            {
                (toys.length > 0) ? (
                    toys.map(toy => (
                        <section className="toy-preview-container">
                            <section className="toy-preview" key={toy._id}>

                                <article className="preview-content">
                                    <ToyPreview toy={toy} />
                                </article>

                                <section className="preview-buttons">
                                    <Link className="custom-button" to={`/toy/details/${toy._id}`}>Details</Link>
                                    <Link className="custom-button" to={`/toy/edit/${toy._id}`}>Edit Toy</Link>
                                    <button className="custom-button" onClick={() => onRemoveToy(toy._id)}>Remove</button>
                                </section>

                            </section>
                        </section>
                    ))
                ) : (<span className="no-toys-notice">No Toys Available</span>)
            }
        </section>
    )
}