import Canvas from '../components/template/Canvas'

const Chat = () => {
    const userScreenX = window.innerWidth
    const userScreenY = window.innerHeight

    return (
        <div>
            <Canvas width={userScreenX} height={userScreenY} />
        </div>
    )
}

export default Chat
