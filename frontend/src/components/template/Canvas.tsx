import { useRef, useEffect } from 'react'
import { NAV_ITEM_HEIGHT } from '@/constants/theme.constant'
import Player from '@/utils/game/player/player'

// Canvas props
interface CanvasProps {
    width: number
    height: number
}

// Canvas component for chat page
const Canvas = ({ width, height }: CanvasProps) => {
    // Canvas reference
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        // Initialize canvas
        if (canvasRef.current) {
            const canvas = canvasRef.current
            const context = canvas.getContext('2d')

            // Disable right click
            canvas.oncontextmenu = (e) => {
                e.preventDefault()
                e.stopPropagation()
            }

            // Initialize canvas
            if (context) {
                // Create player
                const player = new Player(
                    'dane',
                    'male',
                    { x: 859, y: 859 },
                    canvas,
                )

                // Mouse down event
                canvas.addEventListener('mousedown', (e) => {
                    if (e.button === 0) {
                        const position = getMousePosition(canvas, e)

                        // Move player
                        player.movePlayer(position.x, position.y)
                    }
                })

                player.update()
            }
        }
    }, [])

    // Return canvas
    return (
        <canvas
            className="position: absolute"
            ref={canvasRef}
            height={height}
            width={width}
        ></canvas>
    )
}

// Get mouse position
const getMousePosition = (canvas: HTMLCanvasElement, e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    return { x, y }
}

// Default props
Canvas.defaultProps = {
    width: window.innerWidth,
    height: window.innerHeight - NAV_ITEM_HEIGHT,
}

export default Canvas
