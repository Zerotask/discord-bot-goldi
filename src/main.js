const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();
const commands = require('../commands.json');
const config = require('../config.json');

client.on('ready', () => {
    console.log("Connected as " + client.user.tag);
});

// Listen for incoming messages.
client.on('message', message => {
    // Don't respond to own bot messages
    if (message.author.bot || !message.content.startsWith(config.commandPrefix)) {
        return;
    }

    // Consider all commands from commands.json
    handleCommands(message);
});

const handleCommands = (message) => {
    const messageContent = message.content;

    for (let key in commands) {
        // Extract message
        const messageParts = messageContent.split(' ');

        // Remove first element from message parts and make it lower case for better comparison
        const command = messageParts.shift().toLowerCase();

        // Check if command key matches the entered message (ignoring the prefix)
        if (key.toLowerCase() === command.substr(1)) {
            let commandResponse = commands[key];

            // Check if a command response has placeholders and there are command arguments provided.
            if (commandResponse.includes('$') && messageParts.length > 0) {
                for (let i = 0; i < messageParts.length; i++) {
                    const placeholder = '$' + i;
                    const messagePart = messageParts[i];

                    commandResponse = commandResponse.replace(placeholder, messagePart);
                }
            }

            // Respond to discord channel.
            message.channel.send(commandResponse);
        }
    }
}

// Start the bot.
client.login(process.env.DISCORD_BOT_TOKEN);