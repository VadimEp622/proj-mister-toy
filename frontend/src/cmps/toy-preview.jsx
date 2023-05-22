export function ToyPreview({ toy }) {
    const { name, price, inStock, labels, createdAt } = toy
    const labelsString = labels.join(', ')
    const isStock = inStock ? 'In stock' : 'Out of stock'
    const classNameColor = inStock ? 'Green' : 'Red'
    return (
        <article className="toy-preview">
            <h2>{name}</h2>
            <h3>price: {price}$</h3>
            <h4 className={classNameColor}>{isStock}</h4>
            {labels.length > 0 && <p>{labelsString}</p>}
        </article>
    )
}