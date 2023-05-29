import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export function UserWelcome({ dispatch, loggedinUser, onLogout }) {

    return (
        <section className="user-welcome">
            <article>
                <h2>Welcome, <span>{loggedinUser.fullname}</span></h2>
            </article>
            {/* <article>
                <Link className="custom-button" to={`/userProfile/:${loggedinUser._id}`}>User Profile</Link>
            </article> */}
            <article>
                <button className="custom-button" onClick={(ev) => onLogout(ev)}>Logout</button>
            </article>
        </section>
    )
}