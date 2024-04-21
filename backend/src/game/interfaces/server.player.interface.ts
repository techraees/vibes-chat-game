import { Socket } from 'socket.io';
import PositionInterface from './server.client.position.interface';

interface PlayerInterface {
  id: string;
  username: string;
  vCoins: number;
  vCard: number;
  married: number;
  position: PositionInterface | null;
  room: number | null;
  socket: Socket;
}

export default PlayerInterface;
