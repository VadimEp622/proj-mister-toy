export function ToyPreview({ toy }) {
    const { name, price, inStock, labels, createdAt } = toy
    const labelsString = labels.join(', ')
    const isStock = inStock ? 'In stock' : 'Out of stock'
    const classNameColor = inStock ? 'Green' : 'Red'
    return (
        <article className="toy-preview">
            <h2>{name}</h2>
            <h3>price: {price}$</h3>
<<<<<<< HEAD
            <h4 className={classNameColor}>{isStock}</h4>
            {labels.length > 0 && <p>{labelsString}</p>}
=======
                {inStock && <h5>In stock</h5>}
                {!inStock && <h5>Out of stock</h5>}
            <section className="card-labels">
            {labels.map((label, index) => (
                <h4 key={index}>{label}</h4>
            ))}
            </section>
>>>>>>> b051fe848bdde049a86a28333129677abd0fcf90
        </article>
    )
}