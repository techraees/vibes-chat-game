/* Import */
import { Socket } from "socket.io";

/* Player class */
class Player {
    public id: string;
    public username: string;
    public currentRoom: string;
    public socket: Socket;

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
    public getId = () => {
        return this.id;
    };

    public getUsername = () => {
        return this.username;
    };

    public getCurrentRoom = () => {
        return this.currentRoom;
    };

    public getSocket = () => {
        return this.socket;
    };
}

/* Export */
export default Player;
