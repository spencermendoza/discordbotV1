class Session {
    constructor(date) {
        this.date = new Date(date);
        this.goodPlayers = [];
        this.badPlayers = [];
    }

    addGoodPlayer(id) {
        this.goodPlayers.push(id);
    }

    removeGoodPlayer(id) {
        let newGoodList = this.goodPlayers.filter(player => player.id !== id);
        this.goodPlayers = newGoodList;
    }

    addBadPlayer(id) {
        this.badPlayers.push(id);
    }

    removeBadPlayer(id) {
        let newBadList = this.badPlayers.filter(player => player.id !== id);
        this.badPlayers = newBadList;
    }
}

module.exports = {
    Session,
}