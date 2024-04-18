import { useState } from 'react'
import Canvas from '../components/template/Canvas'
import Rooms from '@/components/template/Rooms'

const Chat = () => {
    // Get user screen dimensions
    const userScreenX = window.innerWidth
    const userScreenY = window.innerHeight

    // State for game instance and room selection
    const [roomSelected, setRoomSelected] = useState<boolean>(false)

    // Render Rooms component if room is not selected, otherwise render Canvas
    return (
        <div>
            {roomSelected ? (
                <Canvas width={userScreenX} height={userScreenY} />
            ) : (
                <Rooms setRoomSelected={setRoomSelected} />
            )}
        </div>
    )
}

export default Chat
