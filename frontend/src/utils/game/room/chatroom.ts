import { roomLayoutInterface } from '../interface/interface'

class ChatRoom {
    public id: number
    public name: string
    public description: string
    public capacity: number
    public remaining: number
    public status: boolean
    public layout: roomLayoutInterface

    constructor(
        id: number,
        name: string,
        description: string,
        capacity: number,
        remaining: number,
        status: boolean,
        layout: roomLayoutInterface,
    ) {
        this.id = id
        this.name = name
        this.description = description
        this.capacity = capacity
        this.remaining = remaining
        this.status = status
        this.layout = layout
    }
}

export default ChatRoom
