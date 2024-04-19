import { Socket } from "socket.io";

// Room Layout Interface
export interface roomLayoutInterface {}

export interface PlayerInterface {
    id: string;
    username: string;
    socket: Socket;
    currentRoom: number | null;
    position: object;
}

// Room Interface
export interface roomInterface {
    id: number;
    name: string;
    description: string;
    participants: PlayerInterface[];
    capacity: number;
    status: boolean;
    layout: roomLayoutInterface;
}

export interface roomDataInterface {
    id: number;
    name: string;
    description: string;
    participants: number;
    capacity: number;
    status: boolean;
}
