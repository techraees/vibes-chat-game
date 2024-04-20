import {
    PlayerInterface,
    PlayerPositionInterface,
} from '../interface/interface'

class Player implements PlayerInterface {
    public id: string
    public username: string
    public vCoins: number
    public vCard: number
    public married: number
    public position: PlayerPositionInterface

    constructor(
        id: string,
        username: string,
        vCoins: number,
        vCard: number,
        married: number,
    ) {
        this.id = id
        this.username = username
        this.vCoins = vCoins
        this.vCard = vCard
        this.married = married
        this.position = {
            x: 0,
            y: 0,
        }
    }
}

export default Player
