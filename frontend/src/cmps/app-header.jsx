import { logout } from "../store/user.action.js"

import { AppLoginSignup } from "./app-login-signup.jsx"
import { UserWelcome } from "./user-welcome.jsx"


import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'


export function AppHeader() {
    const dispatch = useDispatch()
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    const navigate = useNavigate()

    function onLogout(ev) {
        ev.preventDefault()
        logout()
        navigate('/')
    }


    return <header className="app-header">

        <section className="nav-container">
            <Link className="logo-container" to="/">
                <img src="/assets/img/logo/logo.png" alt="logo" />
            </Link>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/toy">Toys</NavLink>
                <NavLink to="/about">About</NavLink>
            </nav>
        </section>


        <section className="user-container">
            {!loggedInUser && <AppLoginSignup dispatch={dispatch} />}
            {loggedInUser && <UserWelcome
                dispatch={dispatch}
                loggedInUser={loggedInUser}
                onLogout={onLogout}
            />}
        </section>

    </header>
}
