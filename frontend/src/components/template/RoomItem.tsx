import Card from '@/components/ui/Card'
import ProgressionBar from './ProgressionBar'
import Button from '@/components/ui/Button'
import { RoomData } from '@/@types/room'
import { HiCheckCircle, HiMinusCircle } from 'react-icons/hi'

const RoomItem = ({ data }: RoomData) => {
    const { name, description, capacity, remaining, status } = data

    const usedSlots = capacity - remaining

    const calculateRemainingPercentage = (
        remainingCapacity: number,
        totalCapacity: number,
    ): number => ((totalCapacity - remainingCapacity) / totalCapacity) * 100

    return (
        <Card bodyClass="h-full">
            <div className="flex flex-col justify-between h-full">
                <div className="flex justify-between">
                    <h6>{name}</h6>

                    <div className="flex items-center rounded-full font-semibold text-xs">
                        <span className="flex items-center">
                            <span className="mr-1 font-semibold">Status:</span>
                            {!status ? (
                                <span className="text-red-500 text-xl">
                                    <HiMinusCircle />
                                </span>
                            ) : (
                                <span className="text-emerald-500 text-xl">
                                    <HiCheckCircle />
                                </span>
                            )}
                        </span>
                    </div>
                </div>
                <p className="mt-4">{description}</p>
                <div className="mt-3">
                    <ProgressionBar
                        progression={calculateRemainingPercentage(
                            remaining,
                            capacity,
                        )}
                    />
                </div>
                <div className="mt-3">
                    <Button size="sm" block>
                        Join room
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default RoomItem
