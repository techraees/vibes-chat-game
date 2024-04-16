import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    console.log(`User: ${userId} connected with socket id: ${socket.id}`);

    socket.on("disconnect", () => {
        console.log("A user disconnected", socket.id);
    });
});

export { app, io, server };
