import Player from '../player/player'

export interface CurrentRoomInterface {
    id: number
    participants: Player[]
    capacity: number
    status: boolean
    layout: object
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
