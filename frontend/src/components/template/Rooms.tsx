import Container from '@/components/shared/Container'
import ContentHeader from './ContentHeader'
import { useGameContext } from '@/context/gameContext'
import RoomItem from './RoomItem'

interface RoomsProps {
    setRoomSelected: React.Dispatch<React.SetStateAction<boolean>>
}

const Rooms: React.FC<RoomsProps> = ({ setRoomSelected }) => {
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
                            setRoomSelected={setRoomSelected}
                        />
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Rooms
