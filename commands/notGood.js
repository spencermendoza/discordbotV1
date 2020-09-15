module.exports = {
    name: 'notgood',
    description: 'This command lets Mr. Bot know that you are not good for this coming Sunday',
    execute(message, args) {
        let client = message.client;
        let nextSessionGood = client.db.nextSessionGood;
        let nextSessionNotGood = client.db.nextSessionNotGood;
        let player = message.author;
        let thisPlayer = {
            name: player.username,
            id: player.id,
            time: message.createdAt,
            sessionDate: client.thisSession,
        }

        let isAlreadyNotGood = nextSessionNotGood.find(function (el) { return el.id }) !== undefined;
        let isAlreadyGood = nextSessionGood.find(function (el) { return el.id }) !== undefined;

        let itemToRemove = function (item) {
            return item.id != thisPlayer.id;
        }

        if (isAlreadyGood) {
            console.log('this player was already good: ', nextSessionGood)
            // let newGood = nextSessionGood.filter(itemToRemove(thisPlayer));
            // nextSessionNotGood.push(thisPlayer);
            // client.db.nextSessionNotGood = nextSessionNotGood;
            // client.db.nextSessionGood = newGood;
            // console.log('is already good: ', isAlreadyGood)
            // console.log('not good: ', client.db.nextSessionNotGood)
            // console.log('good: ', client.db.nextSessionGood)
            // message.channel.send(`${message.author} used to be good to play, but now they're not good anymore!`)
        } else if (isAlreadyNotGood) {
            message.channel.send(`${message.author} is trying to join the not good list twice. You sneaky bastard!`)
            console.log('not good: ', client.db.nextSessionNotGood)
            console.log(isAlreadyNotGood)
        } else {
            nextSessionNotGood.push(thisPlayer);
            client.db.nextSessionNotGood = nextSessionNotGood;
            message.channel.send(`${message.author} is not good for next session!`);
            console.log('not good: ', client.db.nextSessionNotGood)
            console.log(isAlreadyNotGood)
        }
    }
}