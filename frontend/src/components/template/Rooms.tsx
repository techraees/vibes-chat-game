import Container from '@/components/shared/Container'
import ContentHeader from './ContentHeader'
import RoomItem from './RoomItem'

const Rooms = ({ rooms }: { rooms: any[] }) => {
    // Render the Rooms component with the received rooms data
    return (
        <div className="mt-6 h-full flex flex-col">
            <Container className="h-full">
                <ContentHeader title="Chat rooms" />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                    {rooms.map((room: any) => (
                        <RoomItem key={room.id} data={room} /> // Ensure each item has a unique key
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Rooms
