import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [
    ...authRoute,
    {
        key: 'access-denied',
        path: '/access-denied',
        component: lazy(() => import('@/views/AccessDenied')),
        authority: ['user', 'admin'],
        meta: {},
    },
]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/Home')),
        authority: ['user', 'admin'],
        meta: {},
    },
    {
        key: 'feed',
        path: '/feed',
        component: lazy(() => import('@/views/Feed')),
        authority: ['user', 'admin'],
        meta: {},
    },
    {
        key: 'inventory',
        path: '/inventory',
        component: lazy(() => import('@/views/Inventory')),
        authority: ['user', 'admin'],
        meta: {},
    },
    {
        key: 'shop',
        path: '/shop',
        component: lazy(() => import('@/views/Shop')),
        authority: ['user', 'admin'],
        meta: {},
    },
    {
        key: 'chat',
        path: '/chat',
        component: lazy(() => import('@/views/Chat')),
        authority: ['user', 'admin'],
        meta: {},
    },
    {
        key: 'purchase',
        path: '/purchase',
        component: lazy(() => import('@/views/Purchase')),
        authority: ['user', 'admin'],
        meta: {},
    },
    {
        key: 'profile',
        path: '/profile',
        component: lazy(() => import('@/views/Profile')),
        authority: ['user', 'admin'],
        meta: {},
    },
    {
        key: 'settings',
        path: '/settings',
        component: lazy(() => import('@/views/Settings')),
        authority: ['user', 'admin'],
        meta: {},
    },
    {
        key: 'help',
        path: '/help',
        component: lazy(() => import('@/views/Help')),
        authority: ['user', 'admin'],
        meta: {},
    },
    {
        key: 'admin',
        path: '/admin',
        component: lazy(() => import('@/views/Admin')),
        authority: ['admin'],
        meta: {},
    },
]
