import Player from '../player/player'

class CurrentRoom {
    public id: number
    public name: string
    public participants: Player[] = []

    constructor(id: number, name: string, participants: Player[]) {
        this.id = id
        this.name = name
        this.participants = participants
    }
}

export default CurrentRoom
