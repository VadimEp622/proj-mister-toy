import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { signup, login } from '../store/user.action.js'


import { useState, Fragment } from 'react'


export function AppLoginSignup({ dispatch }) {
    const [credentials, setCredentials] = useState(userService.getEmptyCredentials())
    const [isNewSignup, setIsNewSignup] = useState(false)



    function handleCredentialsChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        const updatedCredentials = { ...credentials, [field]: value }
        setCredentials(updatedCredentials)
    }

    function onSubmit(ev) {
        ev.preventDefault()
        const method = isNewSignup ? signup : login
        method(credentials)
            .then(user => {
                console.log(`User ${isNewSignup ? 'signup' : 'login'} success`, user)
                showSuccessMsg(`User ${isNewSignup ? 'signup' : 'login'} success`)
            })
            .catch(err => {
                console.log(`User ${isNewSignup ? 'signup' : 'login'} fail`, err)
                showErrorMsg(`User ${isNewSignup ? 'signup' : 'login'} fail`)
            })
    }

    function onToggleSignupState() {
        setIsNewSignup(!isNewSignup)
    }


    const { username, password, fullname } = credentials
    return (
        <Fragment>
            <form className="register-form" onSubmit={onSubmit}>
                <input
                    type="text"
                    name="username"
                    value={username}
                    placeholder="Username"
                    onChange={handleCredentialsChange}
                    required
                    autoFocus
                />

                <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={handleCredentialsChange}
                    required
                />

                {isNewSignup && <input
                    type="text"
                    name="fullname"
                    value={fullname}
                    placeholder="Full name"
                    onChange={handleCredentialsChange}
                    required
                />}

                <button>{isNewSignup ? 'Signup' : 'Login'}</button>
            </form>

            <button className="" onClick={onToggleSignupState}>
                {isNewSignup ? 'Already a member? Login' : 'New user? Signup here'}
            </button >
        </Fragment >
    )
}

