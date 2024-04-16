import { useRef, useEffect } from 'react'
import { NAV_ITEM_HEIGHT } from '@/constants/theme.constant'
import InputGroup from '@/components/ui/InputGroup'
import { HiChat } from 'react-icons/hi'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

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
            }

            // Resize canvas
            window.addEventListener('resize', () => {
                canvas.width = window.innerWidth
                canvas.height = window.innerHeight - NAV_ITEM_HEIGHT
            })
        }
    }, [])

    // Return canvas
    return (
        <div>
            <canvas
                ref={canvasRef}
                height={height - NAV_ITEM_HEIGHT}
                width={width}
                className="static"
            ></canvas>
            <div className="relative">
                <InputGroup className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2">
                    <Input
                        prefix={
                            <HiChat className="text-xl text-indigo-600 cursor-pointer" />
                        }
                    />
                    <Button>Send</Button>
                </InputGroup>
            </div>
        </div>
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
