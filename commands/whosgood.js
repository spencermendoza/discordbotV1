module.exports = {
    name: 'whosgood',
    description: 'Lets people know who all is good for next session',
    execute(message, args) {
        let client = message.client;
        let goodList = client.db.goodPlayers;

        console.log('these guys are good for next session: ', goodList);
        if (goodList.length === 0) {
            message.channel.send(`Nobody has said they are good so far, time is ticking boys!`);
        } else {
            var msg = '';
            for (let i = 0; i < goodList.length; i++) {
                if (goodList.length === 1) {
                    msg = `Only ${goodList[i]} has said that they're good this week. Come on people!`;
                    break;
                }
                if (i === goodList.length - 1) {
                    msg += `and ${goodList[i]} have said they are good to play this week.`
                } else {
                    msg += `${goodList[i]}, `;
                }
            }
            message.channel.send(msg);
        }
    }
}