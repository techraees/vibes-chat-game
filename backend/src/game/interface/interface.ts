import { Socket } from "socket.io";

// Room Layout Interface
export interface roomLayoutInterface {}

// Participant interface
export interface Participant {
    id: string;
    username: string;
}

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
    participants: Participant[];
    capacity: number;
    status: boolean;
    layout: roomLayoutInterface;
}
