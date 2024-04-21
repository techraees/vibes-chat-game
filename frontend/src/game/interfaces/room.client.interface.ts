import RoomParticipantInterface from './room.participant.interface'

interface RoomClientInterface {
    id: number
    name: string
    participants: RoomParticipantInterface[]
}

export default RoomClientInterface
