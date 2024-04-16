import { createContext, useEffect, useState } from 'react'
import useAuth from '@/utils/hooks/useAuth'
import io, { Socket } from 'socket.io-client'

interface SocketContextValue {
    socket: Socket | null
}

const SocketContext = createContext<SocketContextValue>({
    socket: null,
})

export const SocketContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [socket, setSocket] = useState<Socket | null>(null)
    const { authenticated } = useAuth()

    useEffect(() => {
        if (authenticated) {
            const socket = io('http://localhost:5000')
            setSocket(socket)

            return () => {
                socket.close()
            }
        } else {
            if (socket) {
                socket.close()
                setSocket(null)
            }
        }
    }, [authenticated])

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )
}
