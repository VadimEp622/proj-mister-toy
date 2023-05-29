import logo from "../assets/img/logo/logo.png"

import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { logout } from "../store/user.action.js"

import { AppLoginSignup } from "./app-login-signup.jsx"
import { UserWelcome } from "./user-welcome.jsx"



export function AppHeader() {
    const dispatch = useDispatch()
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    const navigate = useNavigate()

    function onLogout(ev) {
        ev.preventDefault()
        logout()
        // navigate('/')
    }


    return (
        <header className="app-header-container full main-layout">
            <section className="app-header">
                <section className="nav-container">
                    <Link className="logo-container" to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                    <nav>
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/toy">Toys</NavLink>
                        <NavLink to="/dashboard">Dashboard</NavLink>
                        <NavLink to="/about">About</NavLink>
                    </nav>
                </section>


                <section className="user-container">
                    {!loggedinUser && <AppLoginSignup dispatch={dispatch} />}
                    {loggedinUser && <UserWelcome
                        dispatch={dispatch}
                        loggedinUser={loggedinUser}
                        onLogout={onLogout}
                    />}
                </section>

            </section>
        </header>
    )
}
