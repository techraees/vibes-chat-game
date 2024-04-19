import { Server, Socket } from "socket.io";
import { debug, debugError } from "../utils/utils";
import ChatRoom from "../room/chatroom";
import Player from "../player/player";
import User from "../../models/user.model";
import Rooms from "../room/rooms.json";
import { roomInterface } from "../interface/interface";

class Game {
    private chatRooms: ChatRoom[] = [];
    private players: Player[] = [];
    private io: Server;

    // Initialize the chat rooms and socket connections
    constructor(io: Server) {
        this.io = io;

        this.initializeRooms();
        this.initializeSocketConnection();
    }

    // Initialize chat rooms from pre-defined data
    private initializeRooms() {
        this.chatRooms = [];

        Rooms.forEach((roomData: roomInterface) => {
            const chatRoom = new ChatRoom(
                roomData.id,
                roomData.name,
                roomData.description,
                roomData.participants,
                roomData.capacity,
                roomData.status,
                roomData.layout
            );

            this.chatRooms.push(chatRoom);
        });

        debug(`Rooms initialized: ${this.chatRooms.length}`);
    }

    // Initialize socket connections for handling client connections
    private initializeSocketConnection() {
        if (!this.io) return;

        this.io.on("connection", (socket: Socket) => {
            this.handleConnection(socket);
        });
    }

    // Handle new client connections
    private async handleConnection(socket: Socket) {
        try {
            const userId = socket.handshake.query.userId as string;
            if (!userId) return;

            const existingPlayer = this.players.find(
                (player) => player.id === userId
            );

            if (existingPlayer) {
                this.handleDuplicateLogin(existingPlayer);
            }

            await this.createPlayer(socket, userId);

            this.attachSocketEvents(socket);
        } catch (error: any) {
            debugError(`Error handling connection: ${error}`);
        }
    }

    // Create a new player instance for the connected user
    private async createPlayer(socket: Socket, userId: string) {
        const user = await User.findById(userId);

        if (user) {
            const player = new Player(
                user._id.toString(),
                user.username,
                "",
                socket
            );

            this.players.push(player);

            debug(
                `[Game] Player created with socket id: ${socket.id} (${userId}). New connected players: ${this.players.length}`
            );
        }
    }

    // Handle duplicate login attempts by sending a notification to the existing player
    private handleDuplicateLogin(player: Player) {
        const playerSocket = player.getSocket();
        playerSocket.emit("duplicateLogin");
        this.disconnectPlayer(playerSocket);
    }

    // Attach socket event listeners for the client socket
    private attachSocketEvents(socket: Socket) {
        this.sendChatroomList(socket);

        socket.on("disconnect", () => this.disconnectPlayer(socket));
        socket.on("joinRoom", (roomId) => this.joinRoom(socket, roomId));
    }

    // Handle player disconnection from the game
    private disconnectPlayer(socket: Socket) {
        const playerIndex = this.players.findIndex(
            (player) => player.socket === socket
        );

        if (playerIndex !== -1) {
            const player = this.players.splice(playerIndex, 1)[0];

            const chatRoom = this.chatRooms.find((room) =>
                room.participants.includes(player)
            );

            if (chatRoom) chatRoom.removePlayer(player);
            socket.disconnect();
        }
    }

    // Send the list of available chat rooms to the client
    private sendChatroomList(socket: Socket) {
        const clientData: ChatRoom[] = this.chatRooms.slice();
        socket.emit("chatroomList", JSON.stringify(clientData));
    }

    // Handle a player's request to join a chat room
    private joinRoom(socket: Socket, roomId: number) {
        const chatRoom = this.chatRooms.find((room) => room.id === roomId);
        if (!chatRoom) return;

        const player = this.players.find((player) => player.socket === socket);
        if (!player) return;

        const existingRoom = this.chatRooms.find((room) =>
            room.participants.includes(player)
        );

        if (existingRoom) {
            existingRoom.removePlayer(player);
        }

        chatRoom.addPlayer(player);
        socket.join(`room-${roomId}`);
        socket.emit("joinRoom", JSON.stringify(chatRoom.getRoomObject()));
    }
}

export default Game;
