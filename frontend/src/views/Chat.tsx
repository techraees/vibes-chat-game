import { useRef, useEffect } from 'react'
import Canvas from '../components/template/Canvas'
import Rooms from '../components/template/Rooms'

const Chat = () => {
    const userScreenX = window.innerWidth
    const userScreenY = window.innerHeight
    const show = false

    useEffect(() => {}, [])

    return (
        <div>
            {!show && <Rooms />}
            {show && <Canvas width={userScreenX} height={userScreenY} />}
        </div>
    )
}

export default Chat
