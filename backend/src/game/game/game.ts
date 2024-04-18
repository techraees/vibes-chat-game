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
                const userId = socket.handshake.query.userId;

                const playerCheck = this.players.find(
                    (player) => player.id === userId
                );

                if (!playerCheck) {
                    // Create player and add to players array
                    this.createPlayer(socket);

                    // Listen for events
                    socket.on("disconnect", () =>
                        this.disconnectPlayer(socket)
                    );
                    socket.on("requestChatroomList", () =>
                        this.sendChatroomList(socket)
                    );
                    socket.on("joinRoom", (data) =>
                        this.joinRoom(socket, data)
                    );
                } else {
                    console.log(
                        `[Game] Player already connected with socket id: ${socket.id} (${userId})`
                    );

                    socket.disconnect();
                }
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
            const chatRoom = this.chatRooms.find((room) =>
                room.paticipants.includes(player)
            );

            if (chatRoom) {
                chatRoom.removePlayer(player);
            }

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
            const clientData: ChatRoom[] = [];

            this.chatRooms.map((chatRoom) => {
                clientData.push(chatRoom);
            });

            socket.emit("chatroomList", JSON.stringify(clientData));
        }
    };

    private joinRoom = (socket: Socket, roomId: number) => {
        const chatRoom = this.chatRooms.find((room) => room.id === roomId);
        const player = this.players.find((player) => player.socket === socket);

        if (chatRoom && player) {
            const roomCheck = this.chatRooms.find((room) =>
                room.paticipants.includes(player)
            );

            if (roomCheck) {
                roomCheck.removePlayer(player);
            } else {
                chatRoom.addPlayer(player);

                socket.join(`room-${roomId}`);

                socket.emit(
                    "joinRoom",
                    JSON.stringify(chatRoom.getRoomObject())
                );
            }
        }
    };
}

export default Game;
