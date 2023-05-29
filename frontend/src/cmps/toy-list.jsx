import { Fragment } from 'react'
import { Link } from 'react-router-dom'

import { ToyPreview } from './toy-preview.jsx'


export function ToyList({ toys, onRemoveToy, loggedinUser }) {
    return (
        <section className="toy-list">
            {
                (toys.length > 0) ? (
                    toys.map(toy => (
                        <section className="toy-preview-container" key={toy._id}>
                            <section className="toy-preview">

                                <article className="preview-content">
                                    <ToyPreview toy={toy} />
                                </article>

                                <section className="preview-buttons">
                                    <Link className="custom-button" to={`/toy/details/${toy._id}`}>Details</Link>
                                    {
                                        loggedinUser && loggedinUser.isAdmin && (
                                            <Fragment>
                                                <Link className="custom-button" to={`/toy/edit/${toy._id}`}>
                                                    Edit Toy
                                                </Link>
                                                <button
                                                    className="custom-button"
                                                    onClick={() => onRemoveToy(toy._id)}
                                                >
                                                    Remove
                                                </button>
                                            </Fragment>
                                        )
                                    }

                                </section>

                            </section>
                        </section>
                    ))
                ) : (<span className="no-toys-notice">No Toys Available</span>)
            }
        </section>
    )
}