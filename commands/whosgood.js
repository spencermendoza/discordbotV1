module.exports = {
    name: 'whosgood',
    description: 'Lets people know who all is good for next session',
    execute(message, args) {
        let client = message.client;
        let nextSessionGood = client.db.nextSessionGood;
        let nextSession = client.db.thisSession;

        console.log('these guys are good for next session: ', nextSessionGood);
        if (nextSessionGood.length === 0) {
            message.channel.send(`Nobody has said they are good so far, time is ticking boys!`);
        } else {
            for (let i = 0; i < nextSessionGood.length; i++) {
                message.channel.send(`<@${nextSessionGood[i].id}> is good for next session, ${nextSession.toDateString()}`)
            }
        }
    }
}