import { useRef, useEffect } from 'react'
import { NAV_ITEM_HEIGHT } from '@/constants/theme.constant'

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
        // Draw a blue rectangle on the canvas
        if (canvasRef.current) {
            const canvas = canvasRef.current
            const context = canvas.getContext('2d')

            // Disable right click
            canvas.oncontextmenu = (e) => {
                e.preventDefault()
                e.stopPropagation()
            }

            // Draw a blue rectangle
            if (context) {
                context.fillStyle = 'blue'
                context.fillRect(0, 0, canvas.width, canvas.height)
            }
        }
    }, [])

    // Return canvas
    return <canvas ref={canvasRef} height={height} width={width} />
}

// Default props
Canvas.defaultProps = {
    width: window.innerWidth,
    height: window.innerHeight - NAV_ITEM_HEIGHT,
}

export default Canvas
