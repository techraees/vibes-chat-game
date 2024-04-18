import { roomLayoutInterface } from '../interface/interface'
import Player from '../player/player'

class ChatRoom {
    public id: number
    public name: string
    public description: string
    public participants: Player[]
    public capacity: number
    public status: boolean
    public layout: roomLayoutInterface

    constructor(
        id: number,
        name: string,
        description: string,
        participants: Player[],
        capacity: number,
        status: boolean,
        layout: roomLayoutInterface,
    ) {
        this.id = id
        this.name = name
        this.description = description
        this.participants = participants
        this.capacity = capacity
        this.status = status
        this.layout = layout
    }
}

export default ChatRoom
