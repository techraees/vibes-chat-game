/* Import */
import Player from "../player/player";
import { Participant } from "../interface/interface";
import { roomLayoutInterface } from "../interface/interface";

/* ChatRoom class */
class ChatRoom {
    /* Properties */
    public id: number;
    public name: string;
    public description: string;
    public participants: Participant[];
    public capacity: number;
    public status: boolean;
    public layout: roomLayoutInterface;

    /* Constructor */
    constructor(
        id: number,
        name: string,
        description: string,
        participants: Participant[],
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

        const participantsData: Participant = {
            id: player.id,
            username: player.username,
        };

        this.participants.push(participantsData);
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
