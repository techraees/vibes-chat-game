class Player {
    public id: string
    public username: string
    public vCoins: number
    public vCards: number
    public married: number

    constructor(
        id: string,
        username: string,
        vCoins: number,
        vCards: number,
        married: number,
    ) {
        this.id = id
        this.username = username
        this.vCoins = vCoins
        this.vCards = vCards
        this.married = married
    }
}

export default Player
