/* Import */
import { PlayerInterface } from "../interface/interface";
import { roomLayoutInterface } from "../interface/interface";
import Player from "../player/player";

/* ChatRoom class */
class ChatRoom {
    /* Properties */
    public id: number;
    public name: string;
    public description: string;
    public participants: PlayerInterface[];
    public capacity: number;
    public status: boolean;
    public layout: roomLayoutInterface;

    /* Constructor */
    constructor(
        id: number,
        name: string,
        description: string,
        participants: PlayerInterface[],
        capacity: number,
        status: boolean,
        layout: roomLayoutInterface
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.participants = participants;
        this.capacity = capacity;
        this.status = status;
        this.layout = layout;
    }

    /* Methods */

    // Add player to room
    public addPlayer = (player: Player) => {
        if (this.isFull()) return false;
        this.participants.push(player);
    };

    // Remove player from room
    public removePlayer = (player: Player) => {
        this.participants = this.participants.filter(
            (participant) => participant.id !== player.id
        );
    };

    // Check if room is full
    public isFull = () => {
        return this.participants.length >= this.capacity;
    };
}

/* Export */
export default ChatRoom;
