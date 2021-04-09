const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();
const commands = require('../commands.json');

client.on('ready', () => {
    console.log("Connected as " + client.user.tag);
});

// Listen for incoming messages.
client.on('message', message => {
    const messageContent = message.content.toLowerCase();

    for (let key in commands) {
        if (messageContent.charAt(0) === '!' && messageContent.substr(1) == key.toLowerCase()) {
            message.channel.send(commands[key].trim());
        }
    }
});

// Start the bot.
client.login(process.env.DISCORD_BOT_TOKEN);