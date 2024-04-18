import Container from '@/components/shared/Container'
import ContentHeader from './ContentHeader'
import { useGameContext } from '@/context/gameContext'
import RoomItem from './RoomItem'

interface RoomsProps {
    setSelectedRoomId: React.Dispatch<React.SetStateAction<number | null>>
}

const Rooms: React.FC<RoomsProps> = ({ setSelectedRoomId }) => {
    const { game } = useGameContext()

    return (
        <div className="mt-6 h-full flex flex-col">
            <Container className="h-full">
                <ContentHeader title="Chat rooms" />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                    {game?.chatRooms.map((room: any) => (
                        <RoomItem
                            key={room.id}
                            data={room}
                            setSelectedRoomId={setSelectedRoomId}
                        />
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Rooms
