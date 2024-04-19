class ChatRoom {
    public id: number
    public name: string
    public description: string
    public participants: number
    public capacity: number
    public status: boolean

    constructor(
        id: number,
        name: string,
        description: string,
        participants: number,
        capacity: number,
        status: boolean,
    ) {
        this.id = id
        this.name = name
        this.description = description
        this.participants = participants
        this.capacity = capacity
        this.status = status
    }
}

export default ChatRoom
