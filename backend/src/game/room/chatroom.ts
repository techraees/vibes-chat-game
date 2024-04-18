/* Import */
import Player from "../player/player";
import { roomLayoutInterface } from "../interface/interface";

/* ChatRoom class */
class ChatRoom {
    /* Properties */
    private id: number;
    private name: string;
    private description: string;
    private paticipants: Player[] = [];
    private capacity: number;
    private status: boolean;
    private layout: roomLayoutInterface;

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
            capacity: this.capacity,
            remaining: this.capacity - this.paticipants.length,
            status: this.status,
            layout: this.layout,
        };
    };
}

/* Export */
export default ChatRoom;
