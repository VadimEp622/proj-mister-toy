export function ToyMsg({ toy, loggedinUser, msg, onSaveMsg, onRemoveMsg, handleChange }) {

    return (
        <section className='toy-msg-container'>
            <section className='list-msg'>
                <h2>Messages:</h2>
                {
                    loggedinUser &&
                    <form className="add-msg" onSubmit={onSaveMsg} >
                        {/* <label htmlFor="addMsg">Message: </label> */}
                        <input id="addMsg"
                            type="text"
                            name="txt"
                            value={msg.txt}
                            onChange={handleChange}
                        />
                        <button>Add</button>
                    </form>
                }
                {toy.msgs?.length > 0 && <ul>
                    {toy.msgs.map((msg, index) =>

                        <li key={index} className="msg-preview">
                            {
                                loggedinUser && loggedinUser.isAdmin &&
                                <button className="custom-button-remove" onClick={(ev) => onRemoveMsg(ev, msg.id)}>X</button>
                            }
                            <h2><span>{msg.by.fullname}: </span>  {msg.txt}</h2>
                        </li>

                    )}
                </ul>
                }
            </section>
        </section>
    )
}