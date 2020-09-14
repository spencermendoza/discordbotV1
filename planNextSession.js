class nextSession {
    constructor({
        date = {},
        players = [],
    }) {
        this.date = date;
        this.players = players;
    }

    static create(sessionObj = {}) {
        return new nextSession(sessionObj);
    }
}