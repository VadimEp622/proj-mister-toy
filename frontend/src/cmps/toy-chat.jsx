import { useState, useEffect } from "react"
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EMIT_SET_TOYID, SOCKET_EVENT_ADD_MSG } from "../services/socket.service"


export function ToyChat({ toy, loggedinUser }) {
    const [msgToEdit, setMsgToEdit] = useState({ txt: '' })
    const [msg, setMsg] = useState(null)
    const [msgs, setMsgs] = useState([])


    useEffect(() => {
        socketService.on(SOCKET_EVENT_ADD_MSG, addMsg)
        socketService.emit(SOCKET_EMIT_SET_TOYID, toy._id)
        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addMsg)
        }
    }, [])


    useEffect(() => {
        if (msg) {
            setMsgs(prevMsgs => ([...prevMsgs, msg]))
            setMsg(null)
        }
    }, [msg])

    function addMsg(newMsg) {
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
    }

    function sendMsg(ev) {
        ev.preventDefault()
        const from = loggedinUser?.fullname || 'Guest'
        const newMsg = { from, txt: msgToEdit.txt }
        console.log(newMsg)
        setMsg(newMsg)
        setMsgToEdit({ txt: '' })
        socketService.emit(SOCKET_EMIT_SEND_MSG, newMsg)
    }

    function handleFormChange(ev) {
        const { name, value } = ev.target
        setMsgToEdit(prevMsg => ({ ...prevMsg, [name]: value }))
    }




    return (
        <section className="toy-chat">
            <h2>Chat Room For {toy._id}</h2>
            <form onSubmit={sendMsg}>
                <input
                    type="text" value={msgToEdit.txt} onChange={handleFormChange}
                    name="txt" autoComplete="off" />
                <button>Send</button>
            </form>

            <ul>
                {msgs.map((msg, idx) => (<li key={idx}>{msg.from}: {msg.txt}</li>))}
            </ul>
        </section>
    )
}

