import { io, Socket } from 'socket.io-client'
import { debug } from '../utils/utils'
import ChatRoom from '../room/chatroom'
import { RoomInterface } from '../interface/interface'

class Game {
    public socket: Socket | null = null
    private authenticated: boolean
    private id: number | null = null
    public chatRooms: ChatRoom[] = []

    constructor(authenticated: boolean, id: number) {
        this.authenticated = authenticated
        this.id = id

        this.initializeSocketConnection()
        this.setupEventListeners()
    }

    private initializeSocketConnection = () => {
        if (!this.socket && this.authenticated && this.id) {
            this.socket = io('http://localhost:5000', {
                query: {
                    userId: this.id,
                },
            })
        }
    }

    private setupEventListeners = () => {
        this.socket?.on('connect', this.connectedServer)
        this.socket?.on('disconnect', this.disconnectedServer)
        this.socket?.on('connect_error', this.disconnectedServer)
        this.socket?.on('chatroomList', this.initializeChatrooms)
        this.socket?.on('joinRoom', this.joinRoom)
    }

    private joinRoom = (room: string) => {
        const roomObject = JSON.parse(room)
        // Todo: Implement joinRoom
    }

    private initializeChatrooms = (chatrooms: string) => {
        const rooms: RoomInterface[] = JSON.parse(chatrooms)

        rooms.forEach((room) => {
            const chatRoom = new ChatRoom(
                room.id,
                room.name,
                room.description,
                room.participants,
                room.capacity,
                room.status,
            )

            this.chatRooms.push(chatRoom)
        })
    }

    private connectedServer = () => {
        debug('Connected to server')
    }

    private disconnectedServer = () => {
        this.closeSocket()
    }

    private closeSocket = () => {
        if (this.socket) {
            this.socket.close()
            this.socket = null
            this.id = null
        }
    }
}

export default Game
