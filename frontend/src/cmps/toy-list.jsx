import { ToyPreview } from './toy-preview.jsx'

export function ToyList({ toys, onToggleIsDone, onEditClick, onRemoveClick, isLoadingRef }) {
    if (isLoadingRef.current) {
        return <span className="loading-notice">Loading...</span>
    }

    return (
        <section className="toy-list">
            {
                (toys.length > 0) ? (
                    toys.map(toy => (
                        <section className="toy-preview" key={toy._id}>
                            <article>
                                <button onClick={(ev) => onEditClick(ev, toy)}>Edit</button>
                            </article>

                            <article className="preview-text">
                                <ToyPreview toy={toy} onToggleIsDone={onToggleIsDone} />
                            </article>

                            <article>
                                <button onClick={(ev) => onRemoveClick(ev, toy._id)}>X</button>
                            </article>
                        </section>
                    ))
                ) : (<span className="no-toys-notice">No Toys</span>)
            }
        </section>
    )
}