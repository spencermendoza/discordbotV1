const Discord = require('discord.js');
const Session = require('../Session.js');

module.exports = {
    name: 'nextsession',
    description: 'this command schedules next session (???)',
    execute(message, args) {
        var newSession = new Session.Session(args);

        let newEmbed = function (session) {
            let embed = new Discord.MessageEmbed()
                .setColor(0x1D82B6)
                .setTitle("Just testing")
                .addFields(
                    {
                        name: ':calendar_spiral: **Dungeons and Dragons**',
                        value: '\u200b'
                    },
                    {
                        name: '**Time**',
                        value: `${session.date.toDateString().substring(0, 11)}, ${session.date.toTimeString().substring(0, 5)}`,
                    },
                    {
                        name: `:white_check_mark: **Attendees:** (${session.goodPlayers.length})`,
                        value: '\u200b'
                    },
                    {
                        name: '\u200b',
                        value: 'Click on the :white_check_mark: reaction below to get that sweet sweet XP!'
                    }
                )
            return embed;
        }
        message.channel.send(newEmbed(newSession))
    }
}