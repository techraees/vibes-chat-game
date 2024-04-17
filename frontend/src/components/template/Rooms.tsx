import { useEffect, useState } from 'react'
import { useSocketContext } from '../context/SocketContext'
import Container from '@/components/shared/Container'
import ContentHeader from './ContentHeader'
import { RoomData } from '@/@types/room'
import RoomItem from './RoomItem'

// Room component for chat page
const Rooms = () => {
    const { socket } = useSocketContext()
    const [roomData, setRoomData] = useState<RoomData[]>([])

    useEffect(() => {
        if (socket) {
            socket.emit('requestRooms')

            socket?.on('chatRooms', (rooms: string) => {
                try {
                    const roomInfo = JSON.parse(rooms)

                    const updatedRoomData: RoomData[] = roomInfo.map(
                        (room: any) => ({
                            data: {
                                id: room.id,
                                name: room.name,
                                description: room.description,
                                capacity: room.capacity,
                                remaining: room.remaining,
                                status: room.status,
                            },
                        }),
                    )

                    setRoomData(updatedRoomData)
                } catch (error) {
                    console.error('Error parsing chat rooms data:', error)
                }
            })
        }
    }, [socket])

    return (
        <div className="mt-6 h-full flex flex-col">
            <Container className="h-full">
                <ContentHeader title="Chat rooms" />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                    {roomData.map((room) => (
                        <RoomItem key={room.data.id} data={room.data} />
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Rooms
