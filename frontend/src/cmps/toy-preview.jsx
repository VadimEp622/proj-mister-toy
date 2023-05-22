export function ToyPreview({ toy }) {

    const { name, price, inStock, labels, createdAt } = toy

    return (
        <article className="toy-preview">
            <h2>{name}</h2>
            <h3>price: {price}$</h3>
                {inStock && <h5>In stock</h5>}
                {!inStock && <h5>Out of stock</h5>}
            <section className="card-labels">
            {labels.map((label, index) => (
                <h4 key={index}>{label}</h4>
            ))}
            </section>
        </article>
    )
}
