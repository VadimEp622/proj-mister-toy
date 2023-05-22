import { ToyPreview } from './toy-preview.jsx'

export function TodoList({ todos, onToggleIsDone, onEditClick, onRemoveClick, isLoadingRef }) {
    if (isLoadingRef.current) {
        return <span className="loading-notice">Loading...</span>
    }

    return (
        <section className="todo-list">
            {
                (todos.length > 0) ? (
                    todos.map(todo => (
                        <section className="todo-preview" key={todo._id}>
                            <article>
                                <button onClick={(ev) => onEditClick(ev, todo)}>Edit</button>
                            </article>

                            <article className="preview-text">
                                <ToyPreview todo={todo} onToggleIsDone={onToggleIsDone} />
                            </article>

                            <article>
                                <button onClick={(ev) => onRemoveClick(ev, todo._id)}>X</button>
                            </article>
                        </section>
                    ))
                ) : (<span className="no-todos-notice">No Todos</span>)
            }
        </section>
    )
}