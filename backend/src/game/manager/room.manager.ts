import RoomInterface from '../interfaces/server.room.interface';
import PlayerManager from './player.manager';
import RoomClientInterface from '../interfaces/client.room.interface';
import RoomClientOverviewInterface from '../interfaces/client.room.overview.interface';

class RoomManager implements RoomInterface {
  readonly id: number;
  readonly name: string;
  readonly description: string;
  participants: PlayerManager[];
  capacity: number;
  status: boolean;

  constructor(
    id: number,
    name: string,
    description: string,
    participants: PlayerManager[],
    capacity: number,
    status: boolean,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.participants = participants;
    this.capacity = capacity;
    this.status = status;
  }

  public getId = (): number => this.id;
  public getName = (): string => this.name;
  public getDescription = (): string => this.description;
  public getParticipants = (): PlayerManager[] => this.participants;
  public getCapacity = (): number => this.capacity;
  public getStatus = (): boolean => this.status;
  public setCapacity = (capacity: number): void => {
    this.capacity = capacity;
  };
  public setStatus = (status: boolean): void => {
    this.status = status;
  };
  public addParticipant = (player: PlayerManager): void => {
    this.participants.push(player);
  };
  public removeParticipant = (playerId: string): void => {
    this.participants = this.participants.filter(
      (player) => player.getId() !== playerId,
    );

    if (!this.isFull()) {
      this.setStatus(true);
    }
  };
  public isFull = (): boolean => this.participants.length >= this.capacity;
  public isEmpty = (): boolean => this.participants.length === 0;
  public isParticipant = (playerId: string): boolean =>
    this.participants.some((player) => player.getId() === playerId);
  public getParticipant = (playerId: string): PlayerManager | undefined =>
    this.participants.find((player) => player.getId() === playerId);
  public getParticipantCount = (): number => this.participants.length;
  public getParticipantIds = (): string[] =>
    this.participants.map((player) => player.getId());
  public getParticipantUsernames = (): string[] =>
    this.participants.map((player) => player.getUsername());
  public getParticipantSocketIds = (): string[] =>
    this.participants.map((player) => player.getSocket().id);
  public generateRoomClientData = (): RoomClientOverviewInterface => {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      participant_count: this.participants.length,
      capacity: this.capacity,
      status: this.status,
    };
  };
  public generateRoomData = (): RoomClientInterface => {
    return {
      id: this.id,
      name: this.name,
      participants: this.participants.map((player) =>
        player.getPlayerClientData(),
      ),
    };
  };
}

export default RoomManager;
