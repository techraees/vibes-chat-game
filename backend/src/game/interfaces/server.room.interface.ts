import PlayerManager from '../manager/player.manager';

interface RoomInterface {
  id: number;
  name: string;
  description: string;
  participants: PlayerManager[];
  capacity: number;
  status: boolean;
}

export default RoomInterface;
