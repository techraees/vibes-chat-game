/* Imports */
import { Server } from "socket.io";
import http from "http";
import express from "express";
import ChatRoom from "./room/chatroom";
import Player from "./player/player";
import User from "../models/user.model";

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
        const rooms = [
            { name: "Java Jolt", capacity: 20 },
            { name: "Park", capacity: 20 },
            { name: "Bus Stop", capacity: 20 },
            { name: "Food Cafe", capacity: 20 },
            { name: "Zsu", capacity: 20 },
            { name: "Stage", capacity: 20 },
            { name: "Beach", capacity: 20 },
            { name: "Mall", capacity: 20 },
            { name: "Lexi Hall", capacity: 20 },
            { name: "Graveyard", capacity: 20 },
        ];

        for (const room of rooms) {
            this.chatRooms.push(new ChatRoom(room.name, room.capacity));
        }

        console.log(`[Game] ${this.chatRooms.length} chat rooms initialized`);
    };

    private initializeSocketEvents = () => {
        console.log(`[Game] Socket initialized`);

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

                console.log(`[Game] ${this.players.length} players connected`);

                socket.on("requestRooms", () => {
                    socket.emit(
                        "chatRooms",
                        this.chatRooms.map((room) => ({
                            name: room.getRoomName(),
                            capacity: room.getRoomCapacity(),
                            remaining: room.getCapacityRemaining(),
                            isFull: room.isRoomFull(),
                        }))
                    );
                });
            }
        });
    };
}

/* Export */
export { app, server, Game };
