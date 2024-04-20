export interface CurrentRoomPlayerInterface {
    id: string
    username: string
    married: number
    position: PlayerPositionInterface
}

export interface PlayerInterface {
    id: string
    username: string
    vCoins: number
    vCard: number
    married: number
    position: PlayerPositionInterface
}

export interface PlayerPositionInterface {
    x: number
    y: number
}

export interface CurrentRoomInterface {
    id: number
    name: string
    users: CurrentRoomPlayerInterface[]
}

export interface RoomInterface {
    id: number
    name: string
    description: string
    participants: number
    capacity: number
    status: boolean
    layout: object
}
