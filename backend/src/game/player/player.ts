/* Import */
import { Socket } from "socket.io";

/* Player class */
class Player {
    /* Properties */
    public id: string;
    public username: string;
    public currentRoom: string;
    public socket: Socket;

    /* Constructor */
    constructor(
        id: string,
        username: string,
        currentRoom: string,
        socket: Socket
    ) {
        this.id = id;
        this.username = username;
        this.currentRoom = currentRoom;
        this.socket = socket;
    }

    /* Methods */

    // Get the player's ID
    public getId = () => {
        return this.id;
    };

    // Get the player's username
    public getUsername = () => {
        return this.username;
    };

    // Get the player's current room
    public getCurrentRoom = () => {
        return this.currentRoom;
    };

    // Get the player's socket
    public getSocket = () => {
        return this.socket;
    };
}

/* Export */
export default Player;
