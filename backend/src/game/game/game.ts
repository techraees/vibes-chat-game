import { Server, Socket } from "socket.io";
import ChatRoom from "../room/chatroom";
import Player from "../player/player";
import User from "../../models/user.model";
import Rooms from "../room/rooms.json";

class Game {
    private chatRooms: ChatRoom[] = [];
    private players: Player[] = [];
    private io: Server;

    constructor(io: Server) {
        this.io = io;
        this.initializeRooms();
        this.initializeSocketConnection();
    }

    // InitializeRooms
    private initializeRooms = () => {
        Rooms.forEach((room) => {
            const chatRoom = new ChatRoom(
                room.id,
                room.name,
                room.description,
                room.capacity,
                room.status,
                room.layout
            );

            this.chatRooms.push(chatRoom);
        });

        console.log(`[Game] ${this.chatRooms.length} Rooms initialized`);
    };

    // Initialize socket connection
    private initializeSocketConnection = () => {
        if (this.io) {
            this.io.on("connection", (socket: Socket) => {
                // Create player and add to players array
                this.createPlayer(socket);

                // Listen for events
                socket.on("disconnect", () => this.disconnectPlayer(socket));
                socket.on("requestChatroomList", () =>
                    this.sendChatroomList(socket)
                );
            });
        }
    };

    // Create player function
    private createPlayer = (socket: Socket) => {
        const userId = socket.handshake.query.userId;

        if (userId) {
            User.findById(userId).then((user) => {
                if (user) {
                    const player = new Player(
                        user._id.toString(),
                        user.username,
                        "",
                        socket
                    );

                    this.players.push(player);
                }
            });
        }

        console.log(
            `[Game] Player created with socket id: ${socket.id} (${userId})`
        );
    };

    // Disconnect player function
    private disconnectPlayer = (socket: Socket) => {
        const player = this.players.find((player) => player.socket === socket);

        if (player) {
            this.players = this.players.filter(
                (player) => player.socket !== socket
            );
        }

        console.log(
            `[Game] Player disconnected with socket id: ${socket.id} (${player?.id})`
        );
    };

    private sendChatroomList = (socket: Socket) => {
        if (socket) {
            const clientData = this.chatRooms.map((chatRoom) => {
                return chatRoom.getRoomObject();
            });

            socket.emit("chatroomList", JSON.stringify(clientData));
        }
    };
}

export default Game;
