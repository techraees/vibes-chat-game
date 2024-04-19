import { apiSignIn, apiSignOut, apiSignUp } from '@/services/AuthService'
import {
    setUser,
    signInSuccess,
    signOutSuccess,
    useAppSelector,
    useAppDispatch,
} from '@/store'
import appConfig from '@/configs/app.config'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'
import type { SignInCredential, SignUpCredential } from '@/@types/auth'
import { useGameContext } from '@/context/gameContext'

type Status = 'success' | 'failed'

function useAuth() {
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const query = useQuery()

    const { signedIn } = useAppSelector((state) => state.auth.session)

    const signIn = async (
        values: SignInCredential,
    ): Promise<
        | {
              status: Status
              message: string
          }
        | undefined
    > => {
        try {
            const resp = await apiSignIn(values)
            if (resp.data) {
                dispatch(signInSuccess())
                if (resp.data.user) {
                    dispatch(
                        setUser(
                            resp.data.user || {
                                _id: 0,
                                avatar: '',
                                username: 'Anonymous',
                                authority: ['USER'],
                                email: '',
                                vCoins: 0,
                                vCard: 0,
                                married: 0,
                            },
                        ),
                    )
                }
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(
                    redirectUrl
                        ? redirectUrl
                        : appConfig.authenticatedEntryPath,
                )
                return {
                    status: 'success',
                    message: '',
                }
            }
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        } catch (errors: any) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const signUp = async (values: SignUpCredential) => {
        try {
            const resp = await apiSignUp(values)
            if (resp.data) {
                dispatch(signInSuccess())
                if (resp.data.user) {
                    dispatch(
                        setUser(
                            resp.data.user || {
                                _id: 0,
                                avatar: '',
                                username: 'Anonymous',
                                authority: ['USER'],
                                email: '',
                                vCoins: 0,
                                vCard: 0,
                                married: 0,
                            },
                        ),
                    )
                }
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(
                    redirectUrl
                        ? redirectUrl
                        : appConfig.authenticatedEntryPath,
                )
                return {
                    status: 'success',
                    message: '',
                }
            }
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        } catch (errors: any) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const handleSignOut = () => {
        dispatch(signOutSuccess())
        dispatch(
            setUser({
                _id: 0,
                avatar: '',
                username: '',
                email: '',
                authority: [],
                vCoins: 0,
                vCard: 0,
                married: 0,
            }),
        )

        navigate(appConfig.unAuthenticatedEntryPath)
    }

    const signOut = async () => {
        await apiSignOut()
        handleSignOut()

        if (game) {
            game.disconnectedServer()
        }
    }

    const { game } = useGameContext()
    game?.socket?.on('duplicateLogin', signOut)

    return {
        authenticated: signedIn,
        signIn,
        signUp,
        signOut,
    }
}

export default useAuth
