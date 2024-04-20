import {
    CurrentRoomInterface,
    CurrentRoomPlayerInterface,
} from '../interface/interface'

class CurrentRoom implements CurrentRoomInterface {
    public id: number
    public name: string
    public users: CurrentRoomPlayerInterface[] = []

    constructor(id: number, name: string, users: CurrentRoomPlayerInterface[]) {
        this.id = id
        this.name = name
        this.users = users
    }
}

export default CurrentRoom
