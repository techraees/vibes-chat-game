import { io, Socket } from 'socket.io-client'

class Game {
    private socket: Socket | null = null
    private id: number
    private authenticated: boolean

    constructor(authenticated: boolean, id: number) {
        this.id = id
        this.authenticated = authenticated

        this.initializeSocketConnection()
        this.setupEventListeners()
    }

    private initializeSocketConnection = () => {
        if (!this.socket) {
            if (this.authenticated) {
                this.socket = io('http://localhost:5000', {
                    query: {
                        userId: this.id,
                    },
                })
            } else {
                if (this.socket) {
                    ;(this.socket as Socket).close()
                    this.socket = null
                }
            }
        }
    }

    private setupEventListeners = () => {
        if (this.socket) {
            this.socket.on('connect', this.connectedServer)
            this.socket.on('disconnect', this.disconnectedServer)
        }
    }

    private connectedServer = () => {
        console.log('Connected to server')
    }

    private disconnectedServer = () => {
        console.log('Disconnected from server')
    }

    private emitEvent = (event: string, data: any) => {
        if (this.socket) {
            this.socket.emit(event, data)
        }
    }
}

export default Game
