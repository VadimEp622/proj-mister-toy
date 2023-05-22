import { todoService } from "../services/todo.service.js"

import { UPDATE_IS_EDIT } from "../store/todo.reducer.js"
import { saveTodo } from "../store/todo.actions.js"

const { useState } = React

export function TodoEdit({ dispatch, todoToEditRef }) {
    const [todoEdit, setTodoEdit] = useState(todoToEditRef.current ? todoToEditRef.current : todoService.getEmptyTodo())


    function handleChange({ target }) {
        console.log('target.value', target.value)
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setTodoEdit(prevTodoEdit => ({ ...prevTodoEdit, [field]: value }))
    }

    function handleAddTodo(ev) {
        ev.preventDefault()
        const todo = {
            ...todoEdit,
            createdAt: Date.now(),
        }
        saveTodo(todo)
            .then(() => {
                dispatch({ type: UPDATE_IS_EDIT, isEdit: false })
                todoToEditRef.current = null//finish current edit session
            })
    }


    return (
        <section className="todo-edit">
            <input
                type="text"
                name="text"
                placeholder="What needs to be done?"
                value={todoEdit.text}
                onChange={handleChange}
            ></input>
            <button onClick={(ev) => handleAddTodo(ev)}>Add</button>
        </section>
    )
}