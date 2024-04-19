import { io, Socket } from 'socket.io-client'
import ChatRoom from '../room/chatroom'

class Game {
    public socket: Socket | null = null
    private authenticated: boolean
    private id: number
    public chatRooms: ChatRoom[] = []
    public currentRoom: ChatRoom | null = null

    constructor(authenticated: boolean, id: number) {
        this.socket = null
        this.authenticated = authenticated
        this.id = id
        this.chatRooms = []
        this.currentRoom = null

        this.initializeSocketConnection()
        this.setupEventListeners()
    }

    private initializeSocketConnection = () => {
        if (!this.socket) {
            if (this.authenticated) {
                if (this.socket) {
                    console.log('Socket already initialized')
                } else {
                    this.socket = io('http://localhost:5000', {
                        query: {
                            userId: this.id,
                        },
                    })
                }
            } else {
                if (this.socket) {
                    ;(this.socket as Socket).close()
                    this.socket = null
                    this.id = 0
                    this.authenticated = false
                }
            }
        }
    }

    private setupEventListeners = () => {
        if (this.socket) {
            this.socket.on('connect', this.connectedServer)
            this.socket.on('disconnect', this.disconnectedServer)
            this.socket.on('chatroomList', this.initializeChatrooms)
            this.socket.on('joinRoom', this.joinRoom)
        }
    }

    private joinRoom = (room: string) => {
        if (room) {
            const roomObject = JSON.parse(room)

            this.currentRoom = new ChatRoom(
                roomObject.id,
                roomObject.name,
                roomObject.description,
                roomObject.participants,
                roomObject.capacity,
                roomObject.status,
                roomObject.layout,
            )

            console.log(`[Game] Joined room ${this.currentRoom.name}`)
        }
    }

    private initializeChatrooms = (chatrooms: string) => {
        if (chatrooms) {
            const rooms = JSON.parse(chatrooms)

            rooms.map((room: ChatRoom) => {
                const roomObject = new ChatRoom(
                    room.id,
                    room.name,
                    room.description,
                    room.participants,
                    room.capacity,
                    room.status,
                    room.layout,
                )

                this.chatRooms.push(roomObject)
            })
        }
    }

    private connectedServer = () => {
        if (this.socket) {
            this.socket.emit('requestChatroomList')
        }
    }

    public disconnectedServer = () => {
        if (this.socket) {
            this.socket.close()
        }

        this.socket = null
        this.id = 0
        this.authenticated = false
        this.chatRooms = []
        this.currentRoom = null

        console.log('Disconnected from server')
    }
}

export default Game
