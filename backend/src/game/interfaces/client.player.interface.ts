import PositionInterface from './server.client.position.interface';

interface PlayerClientInterface {
  id: string;
  username: string;
  vCoins: number;
  vCard: number;
  married: number;
  position: PositionInterface | null;
  room: number | null;
}

export default PlayerClientInterface;
