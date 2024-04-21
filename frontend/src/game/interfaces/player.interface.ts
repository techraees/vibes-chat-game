import PositionInterface from './position.interface'

interface PlayerInterface {
    id: string
    username: string
    vCoins: number
    vCard: number
    married: number
    position: PositionInterface
}

export default PlayerInterface
