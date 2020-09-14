const Discord = require('discord.js');
const client = new Discord.Client();
const token = require('./token.js');
const server = client.guilds.cache;
const prefix = '!';
const fs = require('fs');
const dateThings = require('./dateThings');
const schedulingTest = '750746205667197048';
const session = require('./planNextSession.js');

var thisSession = new Date(2020, 8, 20, 11, 0, 0, 0);
var nextSessionGood = [];
var nextSessionNotGood = [];

client.once('ready', () => {
    console.log('This bot is online')
});

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command)
}

client.on('ready', () => {
    var serverId;
    var serverName;
    var now = new Date();

    var serverList = server.map(s => {
        if (s.name === 'DUNGEONS N DRAGONS') {
            serverName = s.name;
            serverId = s.id;
            console.log(serverId, serverName, now)
        }
    })
})


//run the date checker
client.on('ready', () => {
    setInterval(function () {
        var caseAnswer = dateThings.dateHandler();
        if (caseAnswer === 'case135') {
            case135();
        } else if (caseAnswer === 'case6') {
            case6();
        } else if (caseAnswer === 'case7') {
            case7();
        } else if (caseAnswer === 'case0') {
            console.log('something is broken '.caseAnswer)
        } else {
            console.log('not working right')
        }
    }, 10000)
});

let case135 = function () {
    console.log('its either Monday, Wednesday, or Friday')
    // client.channels.cache.get(schedulingTest).send(`Who's good for this Sunday? ${thisSession.toDateString()}`)
}

let case6 = function () {
    console.log('its Saturday');
    // client.channels.cache.get(schedulingTest).send('Reminder that we\'re playing tomorrow!')
}

let case7 = function () {
    console.log('its Sunday!')
    thisSession = nextSessionDate();
    // client.channels.cache.get(schedulingTest).send('It\'s Sunday! Time to start planning our next session!')
    nextSessionGood = [];
    nextSessionNotGood = [];
}

let nextSessionDate = function () {
    var now = thisSession;
    now.setDate((now.getDate() + 7));
    return now;
}


client.on('message', msg => {
    var commandObjs = client.commands;
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    const commands = commandObjs.map(c => {
        return c.name;
    });

    for (let i = 0; i < commands.length; i++) {
        if (command === 'commandlist') {
            client.commands.get(command).execute(msg, commandObjs);
            break;
        } else if (command === commands[i]) {
            client.commands.get(command).execute(msg, commands);
        }
    }
});

client.on('message', msg => {
    if (msg.content.includes('this bot is cool')) {
        msg.reply("What the fuck did you just fucking say about me, you little bitch? I'll have you know I graduated top of my class in the Navy Seals, and I've been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I'm the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You're fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that's just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little 'clever' comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn't, you didn't, and now you're paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You're fucking dead, kiddo.")
    }
})

// function shuffle(a) {
//     for (let i = a.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [a[i], a[j]] = [a[j], a[i]];
//     }
//     return a;
// };

// client.on('messageReactionAdd', async (reaction, user) => {
//     if (reaction.partial) {
//         try {
//             await reaction.fetch();
//         } catch (error) {
//             console.log('Something went wrong fetching the message: ', error);
//             return;
//         }
//     }

//     var scrim = scrims[reaction.message.id]
//     if (scrim) {
//         scrim.addPlayer(user.id)
//     }
// })

// client.on('message', msg => {
//     if (msg.content.startsWith('+scrim')) {
//         var playerSlots = 4;
//         var promptText = `Scrim started with ${playerSlots} slots. Add reaction to join.`
//         msg.reply(promptText).then(botMsg => {
//             scrims[botMsg.id] = new Scrim(botMsg, playerSlots)
//         })
//     }
// })

// var scrims = {};
// class Scrim {
//     constructor(message, maxPlayers) {
//         this.message = message;
//         this.maxPlayers = maxPlayers;
//         this.players = [];
//     }

//     addPlayer(id) {
//         this.players.push(id)
//         this.announcePlayerCount();

//         if (this.players.length === this.maxPlayers) {
//             this.handleFullMatch();
//         }
//     }

//     announcePlayerCount() {
//         this.message.channel.send(`There are ${this.players.length} people in the scrim.`)
//     }

//     handleFullMatch() {
//         var teamOne = [];
//         var teamTwo = [];
//         var shuffledPlayers = shuffle([...this.players]);

//         shuffledPlayers.forEach((player, i) => {
//             var tag = '<@' + player + '>';
//             if (i % 2) {
//                 teamOne.push(tag)
//             } else {
//                 teamTwo.push(tag)
//             }
//         })

//         this.message.channel.send([
//             "",
//             `*** SCRIM TEAMS ***`,
//             `Team One: ${teamOne.join(", ")}`,
//             `**VS**`,
//             `Team Two: ${teamTwo.join(", ")}`
//         ]).then(() => {
//             this.message.edit("SCRIM FILLED!")
//             delete scrims[this.message.id];
//         })
//     }
// }

client.login(token);