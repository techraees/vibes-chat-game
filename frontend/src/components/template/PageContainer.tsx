import { Suspense } from 'react'
import classNames from 'classnames'
import Container from '@/components/shared/Container'
import {
    PAGE_CONTAINER_GUTTER_X,
    PAGE_CONTAINER_GUTTER_Y,
} from '@/constants/theme.constant'
import type { CommonProps } from '@/@types/common'
import type { Meta } from '@/@types/routes'
import type { ElementType, ComponentPropsWithRef, ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { useGameContext } from '@/context/gameContext'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import {
    HiBadgeCheck,
    HiOutlineInformationCircle,
    HiOutlineHand,
    HiOutlineExclamation,
} from 'react-icons/hi'

export interface PageContainerProps extends CommonProps, Meta {
    contained?: boolean
}

const CustomHeader = <T extends ElementType>({
    header,
    ...props
}: {
    header: T
} & ComponentPropsWithRef<T>) => {
    const Header = header
    return <Header {...props} />
}

const displayNotification = (level: string, message: string) => {
    let icon: ReactNode = null
    let title: string = ''

    if (level === 'SUCCESS') {
        icon = <HiBadgeCheck className="text-2xl text-indigo-600" />
        title = 'Vibes success'
    } else if (level === 'INFO') {
        icon = (
            <HiOutlineInformationCircle className="text-2xl text-indigo-600" />
        )
        title = 'Vibes info'
    } else if (level === 'WARNING') {
        icon = <HiOutlineHand className="text-2xl text-indigo-600" />
        title = 'Vibes warning'
    } else if (level === 'ERROR') {
        icon = <HiOutlineExclamation className="text-2xl text-indigo-600" />
        title = 'Vibes error'
    }

    toast.push(
        <Notification title={title} customIcon={icon}>
            {message}
        </Notification>,
        { placement: 'bottom-end' },
    )
}

const PageContainer = (props: PageContainerProps) => {
    const {
        pageContainerType = 'default',
        children,
        header,
        contained = false,
        extraHeader,
        footer = true,
    } = props

    const location = useLocation()
    const path = location.pathname

    const { game } = useGameContext()

    game?.socket?.on('notify', (data: string) => {
        const notifcation = JSON.parse(data)

        displayNotification(notifcation.level, notifcation.message)
    })

    return (
        <div className="h-full flex flex-auto flex-col justify-between">
            <main className="h-full">
                <div
                    className={classNames(
                        'page-container relative h-full flex flex-auto flex-col',
                        pageContainerType !== 'gutterless' &&
                            path !== '/chat' &&
                            `${PAGE_CONTAINER_GUTTER_X} ${PAGE_CONTAINER_GUTTER_Y}`,
                        pageContainerType === 'contained' &&
                            'container mx-auto',
                    )}
                >
                    {(header || extraHeader) && (
                        <div
                            className={classNames(
                                contained && 'container mx-auto',
                                'flex items-center justify-between mb-4',
                            )}
                        >
                            <div>
                                {header && typeof header === 'string' && (
                                    <h3>{header}</h3>
                                )}
                                <Suspense fallback={<div></div>}>
                                    {header && typeof header !== 'string' && (
                                        <CustomHeader header={header} />
                                    )}
                                </Suspense>
                            </div>
                            <Suspense fallback={<div></div>}>
                                {extraHeader &&
                                    typeof extraHeader !== 'string' && (
                                        <CustomHeader header={extraHeader} />
                                    )}
                            </Suspense>
                        </div>
                    )}
                    {pageContainerType === 'contained' ? (
                        <Container className="h-full">
                            <>{children}</>
                        </Container>
                    ) : (
                        <>{children}</>
                    )}
                </div>
            </main>
        </div>
    )
}

export default PageContainer
