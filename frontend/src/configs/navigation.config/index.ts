import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE,
} from '@/constants/navigation.constant'
import type { NavigationTree } from '@/@types/navigation'

const navigationConfig: NavigationTree[] = [
    {
        key: 'home',
        path: '/home',
        title: 'Home',
        translateKey: 'nav.home',
        icon: 'home',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'feed',
        path: '/feed',
        title: 'Feed',
        translateKey: 'nav.feed',
        icon: 'feed',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'inventory',
        path: '/inventory',
        title: 'Inventory',
        translateKey: 'nav.inventory',
        icon: 'inventory',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'shop',
        path: '/shop',
        title: 'Shop',
        translateKey: 'nav.shop',
        icon: 'shop',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'chat',
        path: '/chat',
        title: 'Chat',
        translateKey: 'nav.chat',
        icon: 'chat',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
]

export default navigationConfig
