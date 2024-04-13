import {
    HiOutlineHome,
    HiOutlineStatusOnline,
    HiOutlineViewGrid,
    HiOutlineShoppingBag,
    HiOutlineChat,
} from 'react-icons/hi'

export type NavigationIcons = Record<string, JSX.Element>

const navigationIcon: NavigationIcons = {
    home: <HiOutlineHome />,
    feed: <HiOutlineStatusOnline />,
    inventory: <HiOutlineViewGrid />,
    shop: <HiOutlineShoppingBag />,
    chat: <HiOutlineChat />,
}

export default navigationIcon
