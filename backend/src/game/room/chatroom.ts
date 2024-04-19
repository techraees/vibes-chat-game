/* Import */
import Player from "../player/player";
import {
    JoinedRoomInterface,
    UserDataInterface,
    PlayerPositionInterface,
} from "../interface/interface";

/* ChatRoom class */
class ChatRoom {
    /* Properties */
    readonly id: number;
    name: string;
    description: string;
    participants: Player[];
    capacity: number;
    status: boolean;

    /* Constructor */
    constructor(
        id: number,
        name: string,
        description: string,
        participants: Player[],
        capacity: number,
        status: boolean
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.participants = participants;
        this.capacity = capacity;
        this.status = status;
    }

    /* Methods */

    // Add player to room
    addPlayer(player: Player): boolean {
        if (this.isFull()) return false;
        this.participants.push(player);
        return true;
    }

    // Remove player from room
    removePlayer(player: Player): void {
        this.participants = this.participants.filter((p) => p.id !== player.id);
    }

    // Check if room is full
    isFull(): boolean {
        return this.participants.length >= this.capacity;
    }

    // Check if player is in room
    hasPlayer(player: Player): boolean {
        return this.participants.some((p) => p.id === player.id);
    }

    // Get players in room
    getPlayers(): Player[] {
        return this.participants;
    }

    // Generate room data
    generateRoomData(): JoinedRoomInterface {
        const userData: UserDataInterface[] = this.participants.map(
            (player) => ({
                id: player.id,
                username: player.username,
                position: player.getPosition() as PlayerPositionInterface,
            })
        );

        return {
            id: this.id,
            name: this.name,
            users: userData,
        };
    }
}

/* Export */
export default ChatRoom;
