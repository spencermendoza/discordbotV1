class thisPlayer {
    constructor({
        name = '',
    }) {
        this.name = name;
    }

    static create(newPlayer = {}) {
        return new thisPlayer(newPlayer);
    }
}