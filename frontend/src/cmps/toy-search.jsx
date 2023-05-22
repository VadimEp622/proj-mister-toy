export function ToySearch({ onSearch }) {
    return (
        <section className="todo-search">
            <label>Search: </label>
            <input
                type="search"
                name="text"
                onChange={(ev) => onSearch({ text: ev.target.value })}
            />
        </section>
    )
}