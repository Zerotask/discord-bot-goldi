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
    client.user.setActivity(config.defaultActivity);
});

// Listen for incoming messages.
client.on('message', message => {
    // console.log(client.guilds.cache.first().members);
    // Don't respond to own bot messages
    if (message.author.bot || !message.content.startsWith(config.commandPrefix)) {
        return;
    }

    const args = message.content.slice(config.commandPrefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    try {
        const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

        // Check if it's a registered command.
        if (cmd) {
            cmd.execute(message, args, client);
        }
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});

// Start the bot.
// Discord dev: @see https://discord.com/developers/applications
client.login(process.env.DISCORD_BOT_TOKEN);