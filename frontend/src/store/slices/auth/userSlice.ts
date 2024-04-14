import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'

export type UserState = {
    avatar?: string
    username?: string
    email?: string
    authority?: string[]
    vCoins?: number
    vCard?: number
    married?: number
}

const initialState: UserState = {
    avatar: '',
    username: '',
    email: '',
    authority: [],
    vCoins: 0,
    vCard: 0,
    married: 0,
}

const userSlice = createSlice({
    name: `${SLICE_BASE_NAME}/user`,
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.avatar = action.payload?.avatar
            state.email = action.payload?.email
            state.username = action.payload?.username
            state.authority = action.payload?.authority
            state.vCoins = action.payload?.vCoins
            state.vCard = action.payload?.vCard
            state.married = action.payload?.married
        },
    },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
