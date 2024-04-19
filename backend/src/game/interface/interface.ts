import { Socket } from "socket.io";
import Player from "../player/player";

// Player Interface for server
export interface PlayerInterface {
    id: string;
    username: string;
    socket: Socket;
    currentRoom: number | null;
    position: object;
}

// Room Interface for server
export interface roomInterface {
    id: number;
    name: string;
    description: string;
    participants: Player[];
    capacity: number;
    status: boolean;
}

// Room Data Interface for client server selection
export interface roomDataInterface {
    id: number;
    name: string;
    description: string;
    participants: number;
    capacity: number;
    status: boolean;
}

// Player Position Interface for client
export interface playerPositionInterface {
    x: number;
    y: number;
}

// User Data Interface for client
export interface userDataInterface {
    id: string;
    username: string;
    position: object;
}

// Joined Room Interface for client
export interface joinedRoomInterface {
    id: number;
    name: string;
    users: userDataInterface[];
}
