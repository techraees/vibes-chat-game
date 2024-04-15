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
    private speed: number = 2

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
            context.fillStyle = 'grey'
            context.beginPath()
            context.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI)
            context.fill()
        }
    }

    // Move player
    movePlayer = (x: number, y: number) => {
        // Set the mouse position
        this.mouseX = x
        this.mouseY = y

        // Calculate the direction vector
        const dx = this.mouseX - this.position.x
        const dy = this.mouseY - this.position.y

        // Calculate the distance
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Normalize the direction vector
        const normDx = dx / distance
        const normDy = dy / distance

        // Set the movement vector
        this.dx = normDx * this.speed
        this.dy = normDy * this.speed
    }

    // Update player
    update = () => {
        // Get the context
        const context = this.canvas.getContext('2d')

        // Clear the canvas
        if (context) {
            context.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.draw()

            // Check if the player should move
            var shouldMove =
                Math.abs(this.position.x - this.mouseX) > 1 ||
                Math.abs(this.position.y - this.mouseY) > 1

            // Move the player
            if (shouldMove) {
                this.position.x += this.dx
                this.position.y += this.dy
            }

            // Request the next frame
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
