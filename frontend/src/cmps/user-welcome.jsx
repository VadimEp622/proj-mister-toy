import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export function UserWelcome({ dispatch, loggedInUser, onLogout }) {
    const progress = useSelector(storeState => storeState.toyModule.progress)

    return (
        <section className="user-welcome">
            <article>
                <h2>Welcome, <span>{loggedInUser.fullname}</span></h2>
            </article>
            <article>
                <Link className="btn" to={`/userProfile/:${loggedInUser._id}`}>User Profile</Link>
            </article>
            <p>Completed: {progress}</p>
            <article>
                <button onClick={(ev) => onLogout(ev)}>Logout</button>
            </article>
        </section>
    )
}