/* Import */
import Player from "../player/player";
import { roomLayoutInterface } from "../interface/interface";

/* ChatRoom class */
class ChatRoom {
    /* Properties */
    public id: number;
    public name: string;
    public description: string;
    public paticipants: Player[] = [];
    public capacity: number;
    public status: boolean;
    public layout: roomLayoutInterface;

    /* Constructor */
    constructor(
        id: number,
        name: string,
        description: string,
        capacity: number,
        status: boolean,
        layout: roomLayoutInterface
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.capacity = capacity;
        this.status = status;
        this.layout = layout;
    }

    /* Methods */

    // Get room object for client
    public getRoomObject = () => {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            paticipants: this.getParticipantsForClient(),
            capacity: this.capacity,
            status: this.status,
            layout: this.layout,
        };
    };

    // Get participants for client
    public getParticipantsForClient = () => {
        if (this.paticipants.length === 0) {
            return [];
        } else {
            this.paticipants.map((player) => {
                return {
                    id: player.getId(),
                    name: player.getUsername(),
                };
            });
        }
    };

    // Add player to room
    public addPlayer = (player: Player) => {
        this.paticipants.push(player);
    };

    // Remove player from room
    public removePlayer = (player: Player) => {
        this.paticipants = this.paticipants.filter(
            (p) => p.getId() !== player.getId()
        );
    };
}

/* Export */
export default ChatRoom;
