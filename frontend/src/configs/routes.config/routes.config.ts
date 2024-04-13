import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'
import path from 'path'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/Home')),
        authority: ['user', 'admin'],
    },
    {
        key: 'feed',
        path: '/feed',
        component: lazy(() => import('@/views/Feed')),
        authority: ['user', 'admin'],
    },
    {
        key: 'inventory',
        path: '/inventory',
        component: lazy(() => import('@/views/Inventory')),
        authority: ['user', 'admin'],
    },
    {
        key: 'shop',
        path: '/shop',
        component: lazy(() => import('@/views/Shop')),
        authority: ['user', 'admin'],
    },
    {
        key: 'chat',
        path: '/chat',
        component: lazy(() => import('@/views/Chat')),
        authority: ['user', 'admin'],
    },
    {
        key: 'purchase',
        path: '/purchase',
        component: lazy(() => import('@/views/Purchase')),
        authority: ['user', 'admin'],
    },
    {
        key: 'profile',
        path: '/profile',
        component: lazy(() => import('@/views/Profile')),
        authority: ['user', 'admin'],
    },
    {
        key: 'settings',
        path: '/settings',
        component: lazy(() => import('@/views/Settings')),
        authority: ['user', 'admin'],
    },
    {
        key: 'help',
        path: '/help',
        component: lazy(() => import('@/views/Help')),
        authority: ['user', 'admin'],
    },
]
