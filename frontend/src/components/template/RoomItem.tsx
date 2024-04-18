import React from 'react'
import Card from '@/components/ui/Card'
import ProgressionBar from './ProgressionBar'
import Button from '@/components/ui/Button'
import { HiCheckCircle, HiMinusCircle } from 'react-icons/hi'
import Player from '../../utils/game/player/player'

interface RoomItemProps {
    data: {
        id: number
        name: string
        description: string
        participants: Player[]
        capacity: number
        status: boolean
    }
    setSelectedRoomId: React.Dispatch<React.SetStateAction<number | null>>
}

const RoomItem: React.FC<RoomItemProps> = ({ data, setSelectedRoomId }) => {
    const { id, name, description, capacity, participants, status } = data
    let playerCount = 0

    if (!participants) {
        playerCount = 0
    } else {
        playerCount = participants.length
    }

    const handleJoinRoom = () => {
        setSelectedRoomId(id)
    }

    return (
        <Card bodyClass="h-full">
            <div className="flex flex-col justify-between h-full">
                <div className="flex justify-between items-center">
                    <h6>{name}</h6>
                    <div className="flex items-center rounded-full font-semibold text-xs">
                        <span className="mr-1 font-semibold">Status:</span>
                        {status ? (
                            <span className="text-emerald-500 text-xl">
                                <HiCheckCircle />
                            </span>
                        ) : (
                            <span className="text-red-500 text-xl">
                                <HiMinusCircle />
                            </span>
                        )}
                    </div>
                </div>
                <p className="mt-4">{description}</p>
                <div className="mt-3">
                    <ProgressionBar
                        progression={
                            ((capacity - (capacity - playerCount)) / capacity) *
                            100
                        }
                    />
                </div>
                <div className="mt-3">
                    <Button size="sm" block onClick={handleJoinRoom}>
                        Join {name}
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default RoomItem
