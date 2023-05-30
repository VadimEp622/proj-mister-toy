export function ToyMsg({ toy, loggedinUser, msg, onSaveMsg, onRemoveMsg, handleChange }) {

    return (
        <section className='toy-comments'>
            {
                loggedinUser &&
                <form className="add-comment" onSubmit={onSaveMsg} >
                    <label htmlFor="addMsg">Comment: </label>
                    <input id="addMsg"
                        type="text"
                        name="txt"
                        value={msg.txt}
                        onChange={handleChange}
                    />
                    <button>Add</button>
                </form>
            }
            <section className='list-comment'>
                <h2>Comments:</h2>
                {toy.msgs?.length > 0 && <ul>
                    {toy.msgs.map((msg, index) =>

                        <li key={index} className="">
                            {
                                loggedinUser && loggedinUser.isAdmin &&
                                <button onClick={(ev) => onRemoveMsg(ev, msg.id)}>X</button>
                            }
                            <span>{msg.by.fullname} : {msg.txt}</span>
                        </li>

                    )}
                </ul>
                }
            </section>
        </section>
    )
}