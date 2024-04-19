import Game from '@/utils/game/game/game'

import { createContext, useContext, useEffect, useState } from 'react'
import { useAppSelector } from '@/store'
import { apiVerify } from '@/services/UserVerificationService'

interface GameContextValue {
    game: Game | null
}

const GameContext = createContext<GameContextValue>({
    game: null,
})

export const useGameContext = () => {
    return useContext(GameContext)
}

export const GameContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [game, setGame] = useState<Game | null>(null)
    const auth = useAppSelector((state) => state.auth)
    const username = useAppSelector((state) => state.auth.user.username ?? '')

    useEffect(() => {
        try {
            if (auth.session.signedIn) {
                ;(async () => {
                    const result = await apiVerify({
                        username,
                    })

                    if (result) {
                        console.log('result.data.id:', result.data.id)

                        const gameInstance = new Game(
                            auth.session.signedIn,
                            result.data.id,
                        )

                        setGame(gameInstance)
                    }
                })()
            }
        } catch (error) {
            console.error('Error initializing game:', error)
        }
    }, [auth])

    return (
        <GameContext.Provider value={{ game }}>{children}</GameContext.Provider>
    )
}
