import { Server, Socket } from "socket.io";
import { debug, debugError } from "../utils/utils";
import ChatRoom from "../room/chatroom";
import Player from "../player/player";
import User from "../../models/user.model";
import Rooms from "../room/rooms.json";
import { roomDataInterface } from "../interface/interface";

class Game {
    private chatRooms: ChatRoom[] = [];
    private players: Player[] = [];
    private io: Server;

    constructor(io: Server) {
        this.io = io;
        this.initializeRooms();
        this.initializeSocketConnection();
    }

    private initializeRooms() {
        this.chatRooms = Rooms.map(
            (roomData) =>
                new ChatRoom(
                    roomData.id,
                    roomData.name,
                    roomData.description,
                    roomData.participants,
                    roomData.capacity,
                    roomData.status
                )
        );
        debug(`Rooms initialized: ${this.chatRooms.length}`);
    }

    private initializeSocketConnection() {
        if (!this.io) return;
        this.io.on("connection", this.handleConnection.bind(this));
    }

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

    private async createPlayer(socket: Socket, userId: string) {
        const user = await User.findById(userId);
        if (user) {
            const player = new Player(
                user._id.toString(),
                user.username,
                socket
            );
            this.players.push(player);
            debug(
                `[Game] Player created with socket id: ${socket.id} (${userId}). New connected players: ${this.players.length}`
            );
        }
    }

    private handleDuplicateLogin(player: Player) {
        const playerSocket = player.getSocket();
        playerSocket.emit("duplicateLogin");
        this.disconnectPlayer(playerSocket);
    }

    private attachSocketEvents(socket: Socket) {
        this.sendChatroomList(socket);
        socket.on("disconnect", () => this.disconnectPlayer(socket));
        socket.on("joinRoom", (roomId) => this.joinRoom(socket, roomId));
    }

    private disconnectPlayer(socket: Socket) {
        const playerIndex = this.players.findIndex(
            (player) => player.socket === socket
        );
        if (playerIndex !== -1) {
            const player = this.players.splice(playerIndex, 1)[0];
            const chatRoom = this.chatRooms.find((room) =>
                room.hasPlayer(player)
            );
            if (chatRoom) chatRoom.removePlayer(player);
            socket.disconnect();
        }
    }

    private sendChatroomList(socket: Socket) {
        const clientData: roomDataInterface[] = this.chatRooms.map((room) => ({
            id: room.id,
            name: room.name,
            description: room.description,
            participants: room.participants.length,
            capacity: room.capacity,
            status: room.status,
        }));
        socket.emit("chatroomList", JSON.stringify(clientData));
    }

    private joinRoom(socket: Socket, roomId: number) {
        const chatRoom = this.chatRooms.find((room) => room.id === roomId);
        if (!chatRoom) return;

        const player = this.players.find((player) => player.socket === socket);
        if (!player) return;

        const existingRoom = this.chatRooms.find((room) =>
            room.hasPlayer(player)
        );
        if (existingRoom) {
            existingRoom.removePlayer(player);
            player.resetCurrentRoom();
        }

        chatRoom.addPlayer(player);
        player.setCurrentRoom(roomId);

        const initData = chatRoom.generateRoomData();
        // Send event to user for initializing the room
        console.log(initData);
    }
}

export default Game;
