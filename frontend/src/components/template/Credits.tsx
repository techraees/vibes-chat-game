import { useAppSelector } from '@/store'

const Credits = () => {
    const { vCard, vCoins } = useAppSelector((state) => state.auth.user)

    return (
        <div>
            <span>{vCoins}</span>
            <span>{vCard}</span>
        </div>
    )
}

export default Credits
