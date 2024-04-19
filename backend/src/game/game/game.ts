/* Importing required modules */
import { Server, Socket } from "socket.io";
import ChatRoom from "../room/chatroom";
import Player from "../player/player";
import User from "../../models/user.model";
import Rooms from "../room/rooms.json";

/* Game class is the main class that handles the game logic and socket connections */
class Game {
    /* Properties */
    private chatRooms: ChatRoom[] = [];
    private players: Player[] = [];
    private io: Server;

    /* Constructor */
    constructor(io: Server) {
        // Initialize Object properties
        this.io = io;
        this.chatRooms = [];
        this.players = [];

        // Initialize the game
        this.initializeRooms();
        this.initializeSocketConnection();
    }

    /* Methods */

    // Initialize the rooms
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

    // Initialize the socket connection
    private initializeSocketConnection = () => {
        try {
            if (this.io) {
                this.io.on("connection", (socket: Socket) => {
                    const userId = socket.handshake.query.userId;

                    const playerCheck = this.players.find(
                        (player) => player.id === userId
                    );

                    if (playerCheck) {
                        const playerCheckSocket = playerCheck.getSocket();
                        playerCheckSocket.emit("duplicateLogin");
                        this.disconnectPlayer(playerCheckSocket);
                    }

                    this.createPlayer(socket);

                    if (socket) {
                        socket.on("disconnect", () =>
                            this.disconnectPlayer(socket)
                        );
                        socket.on("requestChatroomList", () =>
                            this.sendChatroomList(socket)
                        );
                        socket.on("joinRoom", (roomId) =>
                            this.joinRoom(socket, roomId)
                        );
                    }
                });
            }
        } catch (error) {
            console.log(`[Game] Error: ${error}`);
        }
    };

    // Create a player
    private createPlayer = async (socket: Socket) => {
        const userId = socket.handshake.query.userId;

        if (userId) {
            try {
                const user = await User.findById(userId);
                if (user) {
                    const player = new Player(
                        user._id.toString(),
                        user.username,
                        "",
                        socket
                    );

                    this.players.push(player);

                    console.log(
                        `[Game] Player created with socket id: ${socket.id} (${userId}). New connected players: ${this.players.length}`
                    );
                }
            } catch (error) {
                console.log(`[Game] Error creating player: ${error}`);
            }
        }
    };

    // Disconnect a player
    private disconnectPlayer = (socket: Socket) => {
        const player = this.players.find((player) => player.socket === socket);

        if (player) {
            const chatRoom = this.chatRooms.find((room) =>
                room.paticipants.includes(player)
            );

            const playerIndex = this.players.indexOf(player);
            if (playerIndex > -1) {
                this.players.splice(playerIndex, 1);
            }

            if (chatRoom) {
                chatRoom.removePlayer(player);
            }

            player.getSocket().disconnect();
        }
    };

    // Send chatroom list to the client
    private sendChatroomList = (socket: Socket) => {
        if (socket) {
            const clientData: ChatRoom[] = [];

            this.chatRooms.map((chatRoom) => {
                clientData.push(chatRoom);
            });

            socket.emit("chatroomList", JSON.stringify(clientData));
        }
    };

    // Join a room
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
