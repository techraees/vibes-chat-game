import PositionInterface from './server.client.position.interface';

interface RoomPlayerInterface {
  id: string;
  username: string;
  married: number;
  position: PositionInterface | null;
}

export default RoomPlayerInterface;
