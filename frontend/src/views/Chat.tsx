import { useState, useEffect } from 'react'
import { useAppSelector } from '@/store'
import Game from '../utils/game/game'
import Rooms from '../components/template/Rooms'
import Canvas from '../components/template/Canvas'

const Chat = () => {
    // Get user screen dimensions
    const userScreenX = window.innerWidth
    const userScreenY = window.innerHeight

    const userData = useAppSelector((state) => state.auth)

    // State for game instance and room selection
    const [game, setGame] = useState<Game | null>(null)
    const [roomSelected, setRoomSelected] = useState<boolean>(false)

    // Initialize game instance on component mount
    useEffect(() => {
        try {
            const gameInstance = new Game(
                userData.session.signedIn,
                userData.user._id ?? 0,
            )

            setGame(gameInstance)
        } catch (error) {
            console.error('Error initializing game:', error)
        }
    }, [])

    // Render Rooms component if room is not selected, otherwise render Canvas
    return <div></div>
}

export default Chat
