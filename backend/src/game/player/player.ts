/* Import */
import { Socket } from "socket.io";
import {
    PlayerInterface,
    PlayerPositionInterface,
    OwnUserDataInterface,
} from "../interface/interface";

/* Player class */
class Player implements PlayerInterface {
    /* Properties */
    public id: string;
    public username: string;
    public vCoins: number;
    public vCard: number;
    public married: number;
    public socket: Socket;
    public currentRoom: number | null;
    public position: PlayerPositionInterface;

    /* Constructor */
    constructor(
        id: string,
        username: string,
        vCoins: number,
        vCard: number,
        married: number,
        socket: Socket
    ) {
        this.id = id;
        this.username = username;
        this.vCoins = vCoins;
        this.vCard = vCard;
        this.married = married;
        this.socket = socket;
        this.currentRoom = null;
        this.position = { x: 0, y: 0 };
    }

    /* Methods */

    // Get the player's ID
    public getId = () => {
        return this.id;
    };

    // Set the player's ID
    public setId = (id: string) => {
        this.id = id;
    };

    // Get the player's vCoins
    public getVCoins = () => {
        return this.vCoins;
    };

    // Set the player's vCoins
    public setVCoins = (vCoins: number) => {
        this.vCoins = vCoins;
    };

    // Get the player's vCard
    public getVCard = () => {
        return this.vCard;
    };

    // Set the player's vCard
    public setVCard = (vCard: number) => {
        this.vCard = vCard;
    };

    // Get the player's married partner
    public getMarried = () => {
        return this.married;
    };

    // Set the player's married partner
    public setMarried = (married: number) => {
        this.married = married;
    };

    // Get the player's username
    public getUsername = () => {
        return this.username;
    };

    // Set the player's username
    public setUsername = (username: string) => {
        this.username = username;
    };

    // Get the player's socket
    public getSocket = () => {
        return this.socket;
    };

    // Set the player's socket
    public setSocket = (socket: Socket) => {
        this.socket = socket;
    };

    // Get the player's current room
    public getCurrentRoom = () => {
        return this.currentRoom;
    };

    // Set the player's current room
    public setCurrentRoom = (room: number) => {
        this.currentRoom = room;
    };

    // Reset the player's current room
    public resetCurrentRoom = () => {
        this.currentRoom = null;
    };

    // Get the player's position
    public getPosition = () => {
        return this.position;
    };

    // Set the player's position
    public setPosition = (position: PlayerPositionInterface) => {
        this.position = position;
    };

    // Generate player data
    public generatePlayerData = () => {
        const userData: OwnUserDataInterface = {
            id: this.id,
            username: this.username,
            vCoins: this.vCoins,
            vCard: this.vCard,
            married: this.married,
        };

        return userData;
    };
}

/* Export */
export default Player;
