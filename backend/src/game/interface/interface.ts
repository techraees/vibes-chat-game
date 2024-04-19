import { Socket } from "socket.io";
import Player from "../player/player";

// Interface for a player on the server
export interface PlayerInterface {
    id: string;
    username: string;
    socket: Socket;
    currentRoom: number | null;
    position: PlayerPositionInterface;
}

// Interface for a room on the server
export interface RoomInterface {
    id: number;
    name: string;
    description: string;
    participants: Player[];
    capacity: number;
    status: boolean;
}

// Interface for room data sent to clients for server selection
export interface RoomDataInterface {
    id: number;
    name: string;
    description: string;
    participants: number;
    capacity: number;
    status: boolean;
}

// Interface for player position sent to clients
export interface PlayerPositionInterface {
    x: number;
    y: number;
}

// Interface for user data sent to clients
export interface UserDataInterface {
    id: string;
    username: string;
    position: PlayerPositionInterface;
}

// Interface for a joined room sent to clients
export interface JoinedRoomInterface {
    id: number;
    name: string;
    users: UserDataInterface[];
}
