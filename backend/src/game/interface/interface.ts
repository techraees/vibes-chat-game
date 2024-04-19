import Player from "../player/player";

// Room Layout Interface
export interface roomLayoutInterface {}

// Room Interface
export interface roomInterface {
    id: number;
    name: string;
    description: string;
    participants: Player[];
    capacity: number;
    status: boolean;
    layout: roomLayoutInterface;
}
