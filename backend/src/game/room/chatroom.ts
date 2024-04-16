/* Import */
import { Socket } from "socket.io";
import Player from "../player/player";

/* ChatRoom class */
class ChatRoom {
    /* Properties */
    private name: string;
    private paticipants: Player[] = [];
    private capacity: number;

    /* Constructor */
    constructor(name: string, capacity: number) {
        this.name = name;
        this.capacity = capacity;
    }

    /* Methods */

    // Get the room name
    public getRoomName = (): string => {
        return this.name;
    };

    // Get the room capacity
    public getRoomCapacity = (): number => {
        return this.capacity;
    };

    // Get the remaining capacity in the room
    public getCapacityRemaining = (): number => {
        return this.capacity - this.paticipants.length;
    };

    // Get participants in the room
    public getRoomParticipants = (): Player[] => {
        return this.paticipants;
    };

    // Check if the room is full
    public isRoomFull = (): boolean => {
        return this.paticipants.length === this.capacity;
    };

    // Add a participant to the room
    public addParticipant = (player: Player) => {
        if (!this.isRoomFull()) {
            this.paticipants.push(player);
            // player.setCurrentRoom(this);

            return true;
        }

        return false;
    };

    // Remove a participant from the room
    public removeParticipant = (player: Player): boolean => {
        const index = this.paticipants.indexOf(player);

        if (index !== -1) {
            this.paticipants.splice(index, 1);
            return true;
        }

        return false;
    };
}

/* Export */
export default ChatRoom;
