export function ToyPreview({ toy, onToggleIsDone }) {

    return (
        <React.Fragment>
            <span
                className={toy.inStock ? 'inStock' : ''}
                onClick={ev => onToggleIsDone(ev, toy)}
            >{toy.text}</span>
        </React.Fragment>
    )
}