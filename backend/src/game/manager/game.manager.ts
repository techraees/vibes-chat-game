import { Server, Socket } from 'socket.io';
import User from '../../models/user.model';
import PlayerManager from './player.manager';
import RoomManager from './room.manager';
import logger from '../../utils/logger';
import RoomConfig from '../config/room.config';
import RoomInterface from '../interfaces/server.room.interface';

class GameManager {
  private io: Server;
  private players: PlayerManager[];
  private rooms: RoomManager[];

  constructor(io: Server) {
    this.io = io;
    this.players = [];
    this.rooms = [];

    this.init();
  }

  private init = () => {
    if (!this.io) return;

    this.initializeRooms();
    this.io.on('connection', this.handleConnection);
  };

  private initializeRooms = () => {
    this.rooms = RoomConfig.map(
      (room: RoomInterface) =>
        new RoomManager(
          room.id,
          room.name,
          room.description,
          room.participants,
          room.capacity,
          room.status,
        ),
    );

    logger.gameDebugMessage(`${this.rooms.length} rooms initialized`);
  };

  private handleConnection = async (socket: Socket) => {
    try {
      const userId = socket.handshake.query.userId as string;
      if (!userId) {
        throw new Error('User ID is required.');
      }

      const existingPlayer = this.findPlayerById(userId);

      if (existingPlayer) {
        this.handleDuplicateLogin(existingPlayer, socket);
      }

      await this.createPlayer(socket, userId);

      this.sendRoomList(socket);
      this.attachSocketEvents(socket);
    } catch (error: any) {
      logger.gameDebugMessage(`Error in handleConnection: ${error.message}`);
    }
  };

  private findPlayerById(userId: string): PlayerManager | undefined {
    return this.players.find((player) => player.id === userId);
  }

  private findPlayerBySocket(socket: Socket): PlayerManager | undefined {
    return this.players.find((player) => player.getSocket() === socket);
  }

  private async createPlayer(socket: Socket, userId: string) {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found.');

    const player = new PlayerManager(
      user._id.toString(),
      user.username,
      user.vCoins,
      user.vCard,
      user.married,
      socket,
    );

    this.players.push(player);

    const playerData = player.getPlayerData();
    socket.emit('setPlayerData', JSON.stringify(playerData));

    logger.gameDebugMessage(
      `Player created with socket id: ${socket.id} (${userId}). New connected players: ${this.players.length}`,
    );
  }

  private sendRoomList(socket: Socket) {
    const roomData = this.rooms.map((room) => room.generateRoomClientData());
    socket.emit('chatroomList', JSON.stringify(roomData));
  }

  private handleDuplicateLogin(player: PlayerManager, socket: Socket) {
    const playerSocket = player.getSocket();
    playerSocket.emit('duplicateLogin');
    this.disconnectPlayer(playerSocket);
  }

  private attachSocketEvents(socket: Socket) {
    socket.on('disconnect', () => this.disconnectPlayer(socket));
    socket.on('joinRoom', (roomId) => this.joinRoom(socket, roomId));
  }

  private joinRoom(socket: Socket, roomId: number) {
    const room = this.rooms.find((room) => room.id === roomId);
    if (!room) return;

    const player = this.findPlayerBySocket(socket);
    if (!player) return;

    const currentRoom = this.rooms.find((room) =>
      room.isParticipant(player.getId()),
    );

    if (currentRoom) {
      currentRoom.removeParticipant(player.id);
      player.resetCurrentRoom();
    }

    if (room.isFull()) {
      socket.emit('notify', 'Room is full. Please try another room.');
      return;
    } else {
      room.addParticipant(player);
      player.setRoom(roomId);
    }

    const clientData = room.generateRoomData();
    socket.emit('joinRoom', JSON.stringify(clientData));
  }

  private disconnectPlayer(socket: Socket) {
    const player = this.findPlayerBySocket(socket);
    if (!player) return;

    const roomId = player.getRoom();

    if (roomId) {
      const room = this.rooms.find((room) => room.id === roomId);

      if (room) {
        room.removeParticipant(player.id);
      }
    }

    this.players = this.players.filter((p) => p.id !== player.id);
  }
}

export default GameManager;
