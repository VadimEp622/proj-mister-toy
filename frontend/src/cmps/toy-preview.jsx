export function ToyPreview({ toy }) {

    const { name, price, inStock, labels, createdAt } = toy

    return (
        <article className="toy-preview">
            <h2>{name}</h2>
            <h3>{price}</h3>
            {labels.map((label, index) => (
                <p key={index}>{label}</p>
            ))}
            {inStock && <p>In stock</p>}
            {!inStock && <p>Out of stock</p>}
        </article>
    )
}
