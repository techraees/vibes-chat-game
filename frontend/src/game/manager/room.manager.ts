import RoomInterface from '../interfaces/room.interface'
import RoomParticipantInterface from '../interfaces/room.participant.interface'

class RoomManager implements RoomInterface {
    public id: number
    public name: string
    public description: string
    public participants: RoomParticipantInterface[]
    public participant_count: number
    public capacity: number
    public status: boolean

    constructor(
        id: number,
        name: string,
        description: string,
        participant_count: number,
        capacity: number,
        status: boolean,
    ) {
        this.id = id
        this.name = name
        this.description = description
        this.participants = []
        this.participant_count = participant_count
        this.capacity = capacity
        this.status = status
    }

    public getId = (): number => this.id
    public getName = (): string => this.name
    public getDescription = (): string => this.description
    public getParticipantCount = (): number => this.participant_count
    public getCapacity = (): number => this.capacity
    public getStatus = (): boolean => this.status
    public setCapacity = (capacity: number): void => {
        this.capacity = capacity
    }
    public setStatus = (status: boolean): void => {
        this.status = status
    }
    public isFull = (): boolean => this.capacity - this.participant_count === 0
    public isEmpty = (): boolean => this.participant_count === 0
    public isAvailable = (): boolean => this.status
}

export default RoomManager
