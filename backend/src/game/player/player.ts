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
}

/* Export */
export default Player;
