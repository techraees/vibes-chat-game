import { Socket } from 'socket.io';
import PlayerInterface from '../interfaces/server.player.interface';
import PlayerClientInterface from '../interfaces/client.player.interface';
import RoomPlayerInterface from '../interfaces/client.room.player.interface';

class PlayerManager implements PlayerInterface {
  readonly id: string;
  readonly username: string;
  vCoins: number;
  vCard: number;
  married: number;
  position: { x: number; y: number } | null = null;
  room: number | null = null;
  socket: Socket;

  constructor(
    id: string,
    username: string,
    vCoins: number,
    vCard: number,
    married: number,
    socket: Socket,
  ) {
    this.id = id;
    this.username = username;
    this.vCoins = vCoins;
    this.vCard = vCard;
    this.married = married;
    this.socket = socket;
  }

  public getId = (): string => this.id;
  public getUsername = (): string => this.username;
  public getVCoins = (): number => this.vCoins;
  public getVCard = (): number => this.vCard;
  public getMarried = (): number => this.married;
  public getPosition = (): { x: number; y: number } | null => this.position;
  public getRoom = (): number | null => this.room;
  public getSocket = (): Socket => this.socket;

  public setVCoins = (vCoins: number): void => {
    this.vCoins = vCoins;
  };
  public setVCard = (vCard: number): void => {
    this.vCard = vCard;
  };
  public setMarried = (married: number): void => {
    this.married = married;
  };
  public setPosition = (position: { x: number; y: number }): void => {
    this.position = position;
  };
  public setRoom = (room: number): void => {
    this.room = room;
  };
  public resetCurrentRoom = (): void => {
    this.room = null;
  };
  public setSocket = (socket: Socket): void => {
    this.socket = socket;
  };
  public getPlayerData = (): PlayerClientInterface => ({
    id: this.id,
    username: this.username,
    vCoins: this.vCoins,
    vCard: this.vCard,
    married: this.married,
    position: this.position,
    room: this.room,
  });
  public getPlayerClientData = (): RoomPlayerInterface => ({
    id: this.id,
    username: this.username,
    married: this.married,
    position: this.position,
  });
}

export default PlayerManager;
