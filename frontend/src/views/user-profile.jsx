import { showSuccessMsg } from "../services/event-bus.service.js"
import { editUser } from "../store/user.action.js"

import { useState } from 'react'

import { useSelector } from 'react-redux'

export function UserProfile() {
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    const [userEdit, setUserEdit] = useState(loggedInUser)


    function handleChange({ target }) {
        // console.log('target.value', target.value)
        const field = target.name
        const value = target.value
        if (field === 'fullname') setUserEdit(prevUserPrefs => ({ ...prevUserPrefs, [field]: value }))
        else setUserEdit(prevUserPrefs => (
            {
                ...prevUserPrefs,
                prefs: {
                    ...prevUserPrefs.prefs,
                    [field]: value
                }
            }
        ))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        showSuccessMsg('Preferences Saved')
        editUser(userEdit)
    }

    if (!loggedInUser) return
    const { color, bgColor } = userEdit.prefs
    return (
        <section className="user-profile" style={{ color, backgroundColor: bgColor }}>
            <article className="user-greeting">
                <p>Hello: </p>
                <h2>{loggedInUser.fullname}</h2>
            </article>
            <article>
                <h2>Edit User Settings:</h2>
                <form className="user-settings-edit" onSubmit={onSubmit}>
                    <section>
                        <label>Name: </label>
                        <input
                            type="text"
                            name="fullname"
                            placeholder="Change name"
                            onChange={handleChange}
                        />
                    </section>
                    <section>
                        <label>Color: </label>
                        <input
                            type="color"
                            name="color"
                            value={color}
                            onChange={handleChange}
                        />
                    </section>
                    <section>
                        <label>Background Color: </label>
                        <input
                            type="color"
                            name="bgColor"
                            value={bgColor}
                            onChange={handleChange}
                        />
                    </section>
                    <input type="submit" value="Save" />
                </form>
            </article>
        </section>
    )
}
