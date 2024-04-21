import { io, Socket } from 'socket.io-client'
import RoomInterface from '../interfaces/room.interface'
import RoomManager from './room.manager'
import PlayerInterface from '../interfaces/player.interface'
import PlayerManager from './player.manager'
import RoomClientInterface from '../interfaces/room.client.interface'

class GameManager {
    public socket: Socket | null = null
    public id: number | null = null
    public rooms: RoomManager[] = []
    public player: PlayerManager | null = null

    constructor(id: number) {
        this.id = id
        this.rooms = []
        this.player = null

        this.init()
    }

    private init = () => {
        this.initializeSocketConnection()
        this.setupEventListeners()
    }

    private initializeSocketConnection = () => {
        if (!this.socket && this.id) {
            this.socket = io('http://localhost:5000', {
                query: {
                    userId: this.id,
                },
            })
        }
    }

    private setupEventListeners = () => {
        this.socket?.on('disconnect', this.disconnectedServer)
        this.socket?.on('connect_error', this.disconnectedServer)
        this.socket?.on('chatroomList', this.setChatrooms)
        this.socket?.on('setPlayerData', this.setPlayerData)
        this.socket?.on('joinRoom', this.joinRoom)
    }

    private setChatrooms = (clientData: string) => {
        const roomData: RoomInterface[] = JSON.parse(clientData)

        roomData.forEach((roomObject: RoomInterface) => {
            const room = new RoomManager(
                roomObject.id,
                roomObject.name,
                roomObject.description,
                roomObject.participant_count,
                roomObject.capacity,
                roomObject.status,
            )

            this.rooms.push(room)
        })
    }

    private joinRoom = (clientData: string) => {
        if (!this.player) return
        const roomData: RoomClientInterface = JSON.parse(clientData)

        const room = this.rooms.find((r) => r.id === roomData.id)
        if (!room) return

        room.participants = roomData.participants
        this.player?.setRoom(roomData.id)
    }

    private setPlayerData = (clientData: string) => {
        const playerData: PlayerInterface = JSON.parse(clientData)

        this.player = new PlayerManager(
            playerData.id,
            playerData.username,
            playerData.vCoins,
            playerData.vCard,
            playerData.married,
            playerData.position,
        )
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

export default GameManager
