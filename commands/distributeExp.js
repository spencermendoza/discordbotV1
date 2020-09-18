module.exports = {
    name: 'distributeexp',
    description: 'Distributes the player\'s xp for when they said they were good/not good',
    execute(message, args) {
        let client = message.client;
        let nextSessionGood = client.db.nextSessionGood;
        let nextSessionNotGood = client.db.nextSessionNotGood;

        let totalRSVP = (nextSessionGood.concat(nextSessionNotGood)).sort((a, b) => b.time - a.time);
        let isMe = message.author.id === '455826573594198016';

        if (isMe) {
            let xp = 6;
            for (let i = 0; i < totalRSVP.length; i++) {
                if (xp > 3) {
                    message.channel.send(`<@${totalRSVP[i].id}> gets ${xp * 1000} XP!`)
                } else {
                    message.channel.send(`<@${totalRSVP[i].id}> gets ${1000} XP!`)
                }
                xp = xp - 1;
            }
        } else {
            message.channel.send(`Did you really think I would let just *anybody* distribute XP, ${message.author}?`)
        }
    }
}