module.exports = {
    name: 'whosnotgood',
    description: 'Lets people know who all isn\'t good for next session',
    execute(message, args) {
        let client = message.client;
        let nextSessionNotGood = client.db.nextSessionNotGood;

        console.log('these guys are good for next session: ', nextSessionNotGood);
        if (nextSessionNotGood.length === 0) {
            message.channel.send(`Nobody has said they aren't good for next session, which (I would assume) is a good thing, yeah?`)
        } else {
            for (let i = 0; i < nextSessionNotGood.length; i++) {
                message.channel.send(`<@${nextSessionNotGood[i].id}> isn't good for next session`)
            }
        }
    }
}