export function ToyPreview({ toy }) {
    const { name, price, inStock, labels, createdAt } = toy
    const labelsString = labels.join(', ')
    const isStock = inStock ? 'In stock' : 'Out of stock'
    const classNameColor = inStock ? 'green' : 'red'
    return (
        <article className="toy-preview">
            <h2>{name}</h2>
            <h3>price: {price}$</h3>
            <p className={classNameColor}>{isStock}</p>
            {labels.length > 0 && <p>{labelsString}</p>}
        </article>
    )
}