export function ToyMsg({ toy, loggedinUser, msg, onSaveMsg, onRemoveMsg, handleChange }) {

    return (
        <section className='toy-comments'>
            <form className="add-comment" onSubmit={onSaveMsg} >
                <label htmlFor="addMsg">AddMsg</label>
                <input id="addMsg"
                    type="text"
                    name="txt"
                    value={msg.txt}
                    onChange={handleChange}
                />
                <button>Add Msg</button>
            </form>
            <section className='list-comment'>
                <h3>Comments</h3>
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