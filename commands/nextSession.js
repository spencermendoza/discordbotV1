const Discord = require('discord.js');
const Session = require('../Session.js');
const client = new Discord.Client();

module.exports = {
    name: 'nextsession',
    description: 'this command schedules next session (???)',
    execute(message, args) {
        let isMe = message.author.id === '455826573594198016';
        if (isMe) {
            var newSession = new Session.Session();
            var newDate = new Date(args);

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
                var rsvpd;
                var noRsvpd;
                if (session.goodPlayers.length === 0) {
                    rsvpd = '\u200b';
                } else {
                    rsvpd = session.goodPlayers.map(user => {
                        return user;
                    });
                }
                if (session.badPlayers.length === 0) {
                    noRsvpd = '\u200b';
                } else {
                    noRsvpd = session.badPlayers.map(user => {
                        return user;
                    })
                }
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
                            value: rsvpd
                        },
                        {
                            name: `❎ **Can't come:** (${session.badPlayers.length})`,
                            value: noRsvpd
                        },
                        {
                            name: '\u200b',
                            value: 'Click on the :white_check_mark: or the ❎ reaction below to get that sweet sweet XP!'
                        }
                    )
                return embed;
            }

            message.client.db = newSession;
            message.channel.send(newEmbed(newSession))
                .then(async function (message) {
                    message.pin()
                    await message.react('✅')
                    await message.react('❎')
                    const filter = (reaction, user) => {
                        return user.bot === false && (reaction.emoji.name === '✅' || reaction.emoji.name === '❎');
                    };

                    const collector = message.createReactionCollector(filter, { dispose: true });

                    collector.on('collect', (reaction, reactionCollector) => {
                        reaction.users.cache.map(user => {
                            if (user.bot === false && reaction.emoji.name === '✅') {
                                if (newSession.badPlayers.includes(user)) {
                                    newSession.removeBadPlayer(user)
                                    reaction.message.reactions.cache.get('❎').users.remove(user.id)
                                }
                                newSession.addGoodPlayer(user)
                                reaction.message.edit(newEmbed(newSession));
                            } else if (user.bot === false && reaction.emoji.name === '❎') {
                                if (newSession.goodPlayers.includes(user)) {
                                    newSession.removeGoodPlayer(user)
                                    reaction.message.reactions.cache.get('✅').users.remove(user.id)
                                }
                                newSession.addBadPlayer(user)
                                reaction.message.edit(newEmbed(newSession));
                            }
                        })
                        reaction.client.db = newSession;
                    })

                    collector.on('remove', (reaction, user) => {
                        if (reaction.emoji.name === '✅') {
                            for (let i = 0; i < newSession.goodPlayers.length; i++) {
                                if (newSession.goodPlayers[i].id === user.id) {
                                    newSession.removeGoodPlayer(user);
                                    reaction.message.edit(newEmbed(newSession));
                                }
                            }
                        } else if (reaction.emoji.name === '❎') {
                            for (let i = 0; i < newSession.badPlayers.length; i++) {
                                if (newSession.badPlayers[i].id === user.id) {
                                    newSession.removeBadPlayer(user);
                                    reaction.message.edit(newEmbed(newSession));
                                }
                            }
                        }
                        message.client.db = newSession;
                    })
                })
        } else {
            session = message.client.db;
            message.channel.send(`Our next session is currently being planned for ${session.date}! Hope you can make it.`)
        }
    }
}