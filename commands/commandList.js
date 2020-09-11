module.exports = {
    name: 'commandlist',
    description: 'This is a list of all the commands I can currently do.',
    execute(message, args) {
        var commands = args.map(c => {
            var command = [
                c.name,
                c.description,
            ]
            return command;
        })
        message.channel.send(`Here is all of my (hopefully) working commands: `)
        for (let i = 0; i < commands.length; i++) {
            message.channel.send('**' + commands[i][0] + '**' + ': ' + commands[i][1]);
        }
    }
}