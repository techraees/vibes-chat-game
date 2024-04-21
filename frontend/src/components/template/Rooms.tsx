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
        <div className="page-container relative h-full flex flex-auto flex-col px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:px-8 container mx-auto">
            <div className="mt-6 h-full flex flex-col">
                <Container className="h-full">
                    <ContentHeader title="Chat rooms" />
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                        {game?.rooms.map((room: any) => (
                            <RoomItem
                                key={room.id}
                                data={room}
                                setSelectedRoomId={setSelectedRoomId}
                            />
                        ))}
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Rooms
