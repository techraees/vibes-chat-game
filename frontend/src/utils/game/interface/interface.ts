import Player from '../player/player'

export interface roomLayoutInterface {}

export interface roomInterface {
    id: number
    name: string
    description: string
    participants: Player[]
    capacity: number
    status: boolean
    layout: object
}
