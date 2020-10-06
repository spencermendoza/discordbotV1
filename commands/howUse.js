module.exports = {
    name: 'howuse',
    description: 'This command will explain to you how to use the bot for scheduling our sessions.',
    execute(message, args) {
        message.channel.send('Ok so this is how I work: Spencer will use my nextsession command to schedule the session. I will respond with a message containing the details of that session. Underneath the message I send there will be two reactions, one check mark, and one X. Depending on whether you are good to play for that week or not you should click on either the check or the X. I\'ll let you figure out which is which. This message will also be pinned to the scheduling channel. You can click on the pin icon in the upper right corner(?) and a menu containing the message will show up. You can then use that menu to jump to the message in the chat and click on the check or X to RSVP. Message Spenz if you have any questions and he will begrudgingly(sp?) answer.')
    }
}