import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes';
import verifyRoutes from './routes/verify.routes';
import connectToDatabase from './database/connect';
import { app, server, io } from './game/server/server';
import GameManager from './game/manager/game.manager';

dotenv.config();

const PORT = process.env.PORT || 3000;

// Configure CORS
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/api/', authRoutes);
app.use('/api/', verifyRoutes);

server.listen(PORT, () => {
  connectToDatabase();
  console.log(`Server is running on port ${PORT}`);

  const gameManager = new GameManager(io);
});
