const Discord = require('discord.js');
const Session = require('../Session.js');
const client = new Discord.Client();

module.exports = {
    name: 'nextsession',
    description: 'this command schedules next session (???)',
    execute(message, args) {
        var newSession = new Session.Session();
        var newDate = new Date(args);
        // var clientDB = message.client.db;

        let isValidDate = function (date) {
            return date instanceof Date && !isNaN(date);
        }

        if (isValidDate(newDate)) {
            newSession.date = newDate;
        } else {
            var today = new Date();
            today.setHours(11, 00, 00)
            for (let i = 0; i < 7; i++) {
                if (today.getDay() === 0) {
                    break;
                } else {
                    today.setDate(today.getDate() + 1);
                }
            }
            newSession.date = today;
        }

        let newEmbed = function (session) {
            let embed = new Discord.MessageEmbed()
                .setColor(0x1D82B6)
                .setTitle("**NEXT TIME ON DUNGEONS AND DRAGONS**")
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
        message.client.db = newSession;
        message.channel.send(newEmbed(newSession))
    }
}