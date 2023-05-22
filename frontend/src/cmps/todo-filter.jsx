export function TodoFilter({ onFilterClick, filterBy }) {

    return (
        <section className="todo-filter">
            <article className="filter-btn-container">
                <button
                    className={`${filterBy.todoState === 'all' ? 'active' : ''}`}
                    onClick={(ev) => onFilterClick(ev, { todoState: 'all' })}
                >All</button>
                <button
                    className={`${filterBy.todoState === 'active' ? 'active' : ''}`}
                    onClick={(ev) => onFilterClick(ev, { todoState: 'active' })}
                >Active</button>
                <button
                    className={`${filterBy.todoState === 'completed' ? 'active' : ''}`}
                    onClick={(ev) => onFilterClick(ev, { todoState: 'completed' })}
                >Completed</button>
            </article>
        </section>
    )
}