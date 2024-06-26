import React from 'react'
import Card from '@/components/ui/Card'
import ProgressionBar from './ProgressionBar'
import Button from '@/components/ui/Button'
import { HiCheckCircle, HiMinusCircle } from 'react-icons/hi'

interface RoomItemProps {
    data: {
        id: number
        name: string
        description: string
        participant_count: number
        capacity: number
        status: boolean
    }
    setSelectedRoomId: React.Dispatch<React.SetStateAction<number | null>>
}

const RoomItem: React.FC<RoomItemProps> = ({ data, setSelectedRoomId }) => {
    const { id, name, description, capacity, participant_count, status } = data

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
                        progression={(participant_count / capacity) * 100}
                    />
                </div>
                <div className="mt-3">
                    <Button
                        size="sm"
                        block
                        onClick={handleJoinRoom}
                        disabled={!status ? true : false}
                    >
                        Join {name}
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default RoomItem
