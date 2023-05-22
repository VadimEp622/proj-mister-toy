export function TodoPreview({ todo, onToggleIsDone }) {

    return (
        <React.Fragment>
            <span
                className={todo.isDone ? 'isDone' : ''}
                onClick={ev => onToggleIsDone(ev, todo)}
            >{todo.text}</span>
        </React.Fragment>
    )
}