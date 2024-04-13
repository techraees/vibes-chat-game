export type SignInCredential = {
    username: string
    password: string
}

export type SignInResponse = {
    token: string
    user: {
        username: string
        authority: string[]
        avatar: string
        email: string
        vCoins: number
        vCard: number
        married: number
    }
}

export type SignUpResponse = SignInResponse

export type SignUpCredential = {
    username: string
    email: string
    password: string
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    password: string
}
