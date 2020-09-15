class thisPlayer {
    constructor(player) {
        this.name = player.name;
        this.id = player.id;
    }

    static create(newPlayer = {}) {
        return new thisPlayer(newPlayer);
    }
}

module.exports = {
    thisPlayer
}