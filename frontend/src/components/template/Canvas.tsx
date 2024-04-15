import { useRef, useEffect } from 'react'
import { NAV_ITEM_HEIGHT } from '@/constants/theme.constant'

interface CanvasProps {
    width: number
    height: number
}

const Canvas = ({ width, height }: CanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current
            const context = canvas.getContext('2d')

            if (context) {
                context.fillStyle = 'blue'
                context.fillRect(0, 0, canvas.width, canvas.height)
            }
        }
    }, [])

    return <canvas ref={canvasRef} height={height} width={width} />
}

Canvas.defaultProps = {
    width: window.innerWidth,
    height: window.innerHeight - NAV_ITEM_HEIGHT,
}

export default Canvas
