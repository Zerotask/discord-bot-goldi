const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();
const config = require('../config.json');

client.commands = new Discord.Collection();
const commandsPath = path.resolve('./src/commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Register commands
for (const file of commandFiles) {
    const command = require(`${commandsPath}/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log("Connected as " + client.user.tag);
});

// Listen for incoming messages.
client.on('message', message => {
    // Don't respond to own bot messages
    if (message.author.bot || !message.content.startsWith(config.commandPrefix)) {
        return;
    }

    const args = message.content.slice(config.commandPrefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Abort if no command is registered with this name.
    if (!client.commands.has(command)) {
        return;
    };

    try {
        client.commands.get(command).execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});

// Start the bot.
client.login(process.env.DISCORD_BOT_TOKEN);