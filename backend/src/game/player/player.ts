/* Import */
import { Socket } from "socket.io";
import ChatRoom from "../room/chatroom";

/* Player class */
class Player {
    private socket: Socket;
    private username: string;
    public id: string;
    private currentRoom: ChatRoom | null = null;

    constructor(socket: Socket, username: string, id: string) {
        this.socket = socket;
        this.username = username;
        this.id = id;

        this.initializeSocketEvents();
    }

    private initializeSocketEvents() {}

    /* Methods */
    public updateSocket = (socket: Socket) => {
        this.socket = socket;
    };
}

/* Export */
export default Player;
