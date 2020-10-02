class Session {
    constructor(date) {
        this.date = new Date(date);
        this.goodPlayers = [];
        this.badPlayers = [];
    }

    addGoodPlayer(user) {
        this.goodPlayers.push(user);
    }

    removeGoodPlayer(user) {
        let newGoodList = this.goodPlayers.filter(player => player.id !== user.id);
        this.goodPlayers = newGoodList;
    }

    addBadPlayer(user) {
        this.badPlayers.push(user);
    }

    removeBadPlayer(user) {
        let newBadList = this.badPlayers.filter(player => player.id !== user.id);
        this.badPlayers = newBadList;
    }
}

module.exports = {
    Session,
}