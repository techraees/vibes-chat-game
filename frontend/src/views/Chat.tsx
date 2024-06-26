import { useState } from 'react'
import Canvas from '../components/template/Canvas'
import Rooms from '@/components/template/Rooms'
import { useGameContext } from '@/context/gameContext'

const Chat = () => {
    // Get game context
    const { game } = useGameContext()
    game?.socket?.emit('requestRoomUpdate')

    // Get user screen dimensions
    const userScreenX = window.innerWidth
    const userScreenY = window.innerHeight

    // State for game instance and room selection
    const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null)

    // Render Rooms component if room is not selected, otherwise render Canvas
    return (
        <div>
            {selectedRoomId ? (
                <Canvas
                    room={selectedRoomId}
                    width={userScreenX}
                    height={userScreenY}
                />
            ) : (
                <Rooms setSelectedRoomId={setSelectedRoomId} />
            )}
        </div>
    )
}

export default Chat
