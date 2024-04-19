export const debug = (message: string): void => {
    console.log(`[Game Debug]: ${message}`)
}

export const debugError = (message: string): void => {
    console.log(`[Game Error]: ${message}`)
}

export const debugObject = (object: any): void => {
    console.log(`[Game Debug]: ${JSON.stringify(object, null, 2)}`)
}
