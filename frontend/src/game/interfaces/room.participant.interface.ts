import PositionInterface from './position.interface'

interface RoomParticipantInterface {
    id: string
    username: string
    married: number
    position: PositionInterface
}

export default RoomParticipantInterface
