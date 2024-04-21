import RoomPlayerInterface from './client.room.player.interface';

interface RoomClientInterface {
  id: number;
  name: string;
  participants: RoomPlayerInterface[];
}

export default RoomClientInterface;
