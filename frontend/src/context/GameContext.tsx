import Game from '@/utils/game/game/game'
import { createContext, useContext, useEffect, useState } from 'react'
import { useAppSelector } from '@/store'
import { use } from 'i18next'

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

    useEffect(() => {
        try {
            if (auth.session.signedIn) {
                const gameInstance = new Game(
                    auth.session.signedIn,
                    auth.user._id ?? 0,
                )

                setGame(gameInstance)
            }
        } catch (error) {
            console.error('Error initializing game:', error)
        }
    }, [auth])

    return (
        <GameContext.Provider value={{ game }}>{children}</GameContext.Provider>
    )
}
