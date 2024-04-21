import PlayerInterface from '../interfaces/player.interface'
import PositionInterface from '../interfaces/position.interface'

class PlayerManager implements PlayerInterface {
    readonly id: string
    readonly username: string
    vCoins: number
    vCard: number
    married: number
    position: PositionInterface
    room: number | null = null

    constructor(
        id: string,
        username: string,
        vCoins: number,
        vCard: number,
        married: number,
        position: PositionInterface,
    ) {
        this.id = id
        this.username = username
        this.vCoins = vCoins
        this.vCard = vCard
        this.married = married
        this.position = position
        this.room = null
    }

    public getId = (): string => this.id
    public getUsername = (): string => this.username
    public getVCoins = (): number => this.vCoins
    public getVCard = (): number => this.vCard
    public getMarried = (): number => this.married
    public getPosition = (): PositionInterface => this.position
    public getRoom = (): number | null => this.room
    public setVCoins = (vCoins: number): void => {
        this.vCoins = vCoins
    }
    public setVCard = (vCard: number): void => {
        this.vCard = vCard
    }
    public setMarried = (married: number): void => {
        this.married = married
    }
    public setPosition = (position: PositionInterface): void => {
        this.position = position
    }
    public setRoom = (roomId: number): void => {
        this.room = roomId
    }
}

export default PlayerManager
