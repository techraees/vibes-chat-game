/* Imports */
import { Server } from "socket.io";
import http from "http";
import express from "express";
import ChatRoom from "./room/chatroom";
import Player from "./player/player";
import User from "../models/user.model";
import rooms from "./room/rooms.json";

/* Server */
const app = express();
const server = http.createServer(app);

// Socket.io
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

/* Game class */
class Game {
    /* Properties */
    private chatRooms: ChatRoom[] = [];
    private players: Player[] = [];

    /* Constructor */
    constructor() {
        this.initializeSocketEvents();
        this.initializeChatRooms();
    }

    /* Methods */
    private initializeChatRooms = () => {
        const roomData = JSON.parse(JSON.stringify(rooms));

        for (const room of roomData) {
            this.chatRooms.push(
                new ChatRoom(
                    room.id,
                    room.name,
                    room.description,
                    room.capacity,
                    room.status,
                    room.layout
                )
            );
        }

        console.log(`[Game] ${this.chatRooms.length} chat rooms initialized`);
    };

    private initializeSocketEvents = () => {
        console.log(`[Game] Socket Events initialized`);

        io.on("connection", async (socket) => {
            const userId = socket.handshake.query.userId as string;

            if (userId) {
                const user = await User.findById(userId);
                const player = new Player(socket, user?.username ?? "", userId);

                if (this.players.find((p) => p.id === userId)) {
                    const user = this.players.find((p) => p.id === userId);

                    user?.updateSocket(socket);
                } else {
                    this.players.push(player);
                }

                socket.on("requestRooms", () => {
                    const data = this.chatRooms.map((room) => {
                        return {
                            id: room.getRoomId(),
                            name: room.getRoomName(),
                            description: room.getRoomDescription(),
                            capacity: room.getRoomCapacity(),
                            remaining: room.getCapacityRemaining(),
                            status: room.getRoomStatus(),
                        };
                    });

                    socket.emit("chatRooms", JSON.stringify(data));
                });
            }
        });
    };
}

/* Export */
export { app, server, Game };
