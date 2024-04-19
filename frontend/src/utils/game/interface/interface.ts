import Player from '../player/player'

export interface currentRoomInterface {
    id: number
    participants: Player[]
    capacity: number
    status: boolean
    layout: object
}

export interface roomLayoutInterface {}

export interface roomInterface {
    id: number
    name: string
    description: string
    participants: number
    capacity: number
    status: boolean
    layout: object
}
