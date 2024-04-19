/* Import */
import { Socket } from "socket.io";
import { PlayerInterface } from "../interface/interface";

/* Player class */
class Player implements PlayerInterface {
    /* Properties */
    public id: string;
    public username: string;
    public socket: Socket;
    public currentRoom: number | null;
    public position: object;

    /* Constructor */
    constructor(id: string, username: string, socket: Socket) {
        this.id = id;
        this.username = username;
        this.socket = socket;
        this.currentRoom = null;
        this.position = { x: 0, y: 0 };
    }

    /* Methods */

    // Get the player's ID
    public getId = () => {
        return this.id;
    };

    // Set the player's ID
    public setId = (id: string) => {
        this.id = id;
    };

    // Get the player's username
    public getUsername = () => {
        return this.username;
    };

    // Set the player's username
    public setUsername = (username: string) => {
        this.username = username;
    };

    // Get the player's socket
    public getSocket = () => {
        return this.socket;
    };

    // Set the player's socket
    public setSocket = (socket: Socket) => {
        this.socket = socket;
    };

    // Get the player's current room
    public getCurrentRoom = () => {
        return this.currentRoom;
    };

    // Set the player's current room
    public setCurrentRoom = (room: number) => {
        this.currentRoom = room;
    };

    // Reset the player's current room
    public resetCurrentRoom = () => {
        this.currentRoom = null;
    };

    // Get the player's position
    public getPosition = () => {
        return this.position;
    };

    // Set the player's position
    public setPosition = (position: object) => {
        this.position = position;
    };
}

/* Export */
export default Player;
