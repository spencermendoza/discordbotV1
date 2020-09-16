module.exports = {
    name: 'good',
    description: 'This command lets Mr. Bot know that you are good for this coming Sunday',
    execute(message, args) {
        let client = message.client;
        let nextSessionGood = client.db.nextSessionGood;
        let nextSessionNotGood = client.db.nextSessionNotGood;
        let player = message.author;
        let thisPlayer = {
            name: player.username,
            id: player.id,
            time: message.createdAt,
            sessionDate: client.db.thisSession,
        }

        let isAlreadyNotGood = nextSessionNotGood.find(function (el) { return el.id }) !== undefined;
        let isAlreadyGood = nextSessionGood.find(function (el) { return el.id }) !== undefined;

        if (isAlreadyNotGood) {
            console.log('this player was already not good: ', isAlreadyNotGood)
            let newNotGood = nextSessionNotGood.filter(player => player.id !== thisPlayer.id);
            nextSessionGood.push(thisPlayer)
            client.db.nextSessionGood = nextSessionGood;
            client.db.nextSessionNotGood = newNotGood;
            console.log('is already not good: ', isAlreadyNotGood)
            console.log('not good: ', client.db.nextSessionNotGood)
            console.log('good: ', client.db.nextSessionGood)
            message.channel.send(`${message.author} used to be not good to play, but now they're good to play!`)
        } else if (isAlreadyGood) {
            message.channel.send(`${message.author} is trying to join the good list twice. You sneaky bastard!`)
            console.log('good: ', client.db.nextSessionGood)
            console.log(isAlreadyGood)
        } else {
            nextSessionGood.push(thisPlayer);
            client.db.nextSessionGood = nextSessionGood;
            message.channel.send(`This player is good for Sunday: ${message.author}!`);
            console.log(client.db.nextSessionGood)
            console.log(isAlreadyGood)
        }
    }
}