/* Interfaces */
interface Position {
    x: number
    y: number
}

// Player class
class Player {
    // Properties
    private name: string
    private gender: string
    private position: Position
    private canvas: HTMLCanvasElement
    private dx: number = 0
    private dy: number = 0
    private mouseX: number = 0
    private mouseY: number = 0
    private stepWidthFactor: number = 200

    // Constructor
    public constructor(
        name: string,
        gender: string,
        position: Position,
        canvas: HTMLCanvasElement,
    ) {
        this.name = name
        this.gender = gender
        this.position = position
        this.canvas = canvas
    }

    /* Methods */

    // Draw function
    draw = () => {
        this.createPlayer()
    }

    // Create player
    createPlayer = () => {
        const context = this.canvas.getContext('2d')

        // Draw a player
        if (context) {
            context.fillStyle = '#F00000'
            context.beginPath()
            context.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI)
            context.fill()
        }
    }

    // Move player
    movePlayer = (x: number, y: number) => {
        this.mouseX = x
        this.mouseY = y

        this.dx = ((this.position.x - this.mouseX) / this.stepWidthFactor) * -1
        this.dy = ((this.position.y - this.mouseY) / this.stepWidthFactor) * -1
    }

    // Update player
    update = () => {
        const context = this.canvas.getContext('2d')

        if (context) {
            context.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.draw()

            var shouldMove =
                Math.abs(this.position.x - this.mouseX) > 1 ||
                Math.abs(this.position.y - this.mouseY) > 1

            if (shouldMove) {
                this.position.x += this.dx
                this.position.y += this.dy
            }

            window.requestAnimationFrame(this.update)
        }
    }

    /* Setters */

    /* Getters */

    // Get player name
    public getName(): string {
        return this.name
    }

    // Get player gender
    public getGender(): string {
        return this.gender
    }

    // Get player position
    public getPosition(): Position {
        return this.position
    }
}

// Export Player class
export default Player
