import { useAppSelector } from '@/store'
import Tag from '@/components/ui/Tag'
import { HiFire, HiOutlineTag } from 'react-icons/hi'
import { Link } from 'react-router-dom'

const Credits = () => {
    const { vCard, vCoins } = useAppSelector((state) => state.auth.user)

    return (
        <div className="flex">
            <div className="mr-2 rtl:ml-2">
                <Link to="purchase">
                    <Tag
                        prefix={
                            <HiFire className="text-base text-grey-500 mr-1 rtl:ml-1" />
                        }
                    >
                        {vCard} credits
                    </Tag>
                </Link>
            </div>
            <div className="mr-2 rtl:ml-2">
                <Tag
                    prefix={
                        <HiOutlineTag className="text-base text-grey-500 mr-1 rtl:ml-1" />
                    }
                >
                    {vCoins} coins
                </Tag>
            </div>
        </div>
    )
}

export default Credits
