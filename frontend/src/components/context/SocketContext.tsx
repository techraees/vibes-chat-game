import { createContext, useContext, useEffect, useState } from 'react'
import useAuth from '@/utils/hooks/useAuth'
import { apiVerify } from '@/services/UserVerificationService'
import { useAppSelector } from '@/store'
import io, { Socket } from 'socket.io-client'

interface SocketContextValue {
    socket: Socket | null
}

const SocketContext = createContext<SocketContextValue>({
    socket: null,
})

export const useSocketContext = () => {
    return useContext(SocketContext)
}

export const SocketContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [socket, setSocket] = useState<Socket | null>(null)
    const { authenticated } = useAuth()

    const username = useAppSelector((state) => state.auth.user.username ?? '')
    const id = useAppSelector((state) => state.auth.user._id)

    useEffect(() => {
        if (authenticated) {
            ;(async () => {
                const result = await apiVerify({
                    username,
                })

                if (result) {
                    const socket = io('http://localhost:5000', {
                        query: {
                            userId: id,
                        },
                    })

                    setSocket(socket)

                    return () => {
                        socket.close()
                    }
                }
            })()
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
