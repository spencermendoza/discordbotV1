const Discord = require('discord.js');
const client = new Discord.Client();
const token = require('./token.js');
const server = client.guilds.cache;
const prefix = '!';
const fs = require('fs');
const schedulingTest = '750746205667197048';
const player = require('./thisPlayer.js');

//Just console logs when the bot is online
client.once('ready', () => {
    var now = new Date()
    console.log('This bot is online at: ', now)
});

//Creates a collection of commands for this bot to use
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command)
}

//Checks if the message starts with '!' and then runs the appropriate command if it exists
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
            client.commands.get(command).execute(msg, args);
        }
    }
});

//Just makes the bot paste the navy seal copypasta
client.on('message', msg => {
    if (msg.content.includes('this bot is cool')) {
        msg.reply("What the fuck did you just fucking say about me, you little bitch? I'll have you know I graduated top of my class in the Navy Seals, and I've been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I'm the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You're fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that's just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little 'clever' comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn't, you didn't, and now you're paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You're fucking dead, kiddo.")
    }
})

client.login(token);