export function ToyFilter({ onFilterClick, filterBy }) {

    return (
        <section className="toy-filter">
            <article className="filter-btn-container">
                <button
                    className={`${filterBy.toyState === 'all' ? 'active' : ''}`}
                    onClick={(ev) => onFilterClick(ev, { toyState: 'all' })}
                >All</button>
                <button
                    className={`${filterBy.toyState === 'active' ? 'active' : ''}`}
                    onClick={(ev) => onFilterClick(ev, { toyState: 'active' })}
                >Active</button>
                <button
                    className={`${filterBy.toyState === 'completed' ? 'active' : ''}`}
                    onClick={(ev) => onFilterClick(ev, { toyState: 'completed' })}
                >Completed</button>
            </article>
        </section>
    )
}