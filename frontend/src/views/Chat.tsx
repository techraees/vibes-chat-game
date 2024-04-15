import Canvas from '../components/template/Canvas'
import { NAV_ITEM_HEIGHT } from '../constants/theme.constant'

const Chat = () => {
    const canvasHeight = window.innerHeight - NAV_ITEM_HEIGHT

    return (
        <div>
            <Canvas height={canvasHeight} />
        </div>
    )
}

export default Chat
