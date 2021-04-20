// Load environment variables
require('dotenv').config();

// Connect to db
require('./db');

// Load packages
const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');
const config = require('../config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandsPath = path.resolve('./src/commands');
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
const { Cringer } = require('./entities/cringer');

// Register commands
for (const file of commandFiles) {
  const command = require(`${commandsPath}/${file}`);
  client.commands.set(command.name, command);
}

const reactToEmojis = (message) => {
  const lowerCaseContent = message.content.toLowerCase();
  console.log(lowerCaseContent);
  if (lowerCaseContent.includes('kappa')) {
    message.channel.send('https://i.kym-cdn.com/photos/images/newsfeed/000/925/494/218.png_large');
  } else if (lowerCaseContent.includes('lul')) {
    message.channel.send('https://freepngimg.com/thumb/league_of_legends/85483-twitch-emote-face-facial-john-expression-bain.png');
  } else if (lowerCaseContent.includes('pogchamp')) {
    message.channel.send('https://freepngimg.com/thumb/mouth/92712-ear-head-twitch-pogchamp-emote-free-download-png-hq-thumb.png');
  } else if (lowerCaseContent.includes('feelsbadman')) {
    message.channel.send('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt9RC-fEDF3xBlO3rRUGFzdX3T25ipBlHq9Q&usqp=CAU');
  } else if (lowerCaseContent.includes('🥳')) {
    message.channel.send(':partying_face: :partying_face: :partying_face:');
  }
};

const reactToCommands = (message) => {
  // Besides reacting to emojis, ignore all non-commands.
  if (!message.content.startsWith(config.commandPrefix)) {
    return;
  }

  const args = message.content.slice(config.commandPrefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  try {
    const cmd = client.commands.get(command)
        || client.commands.find((entry) => entry.aliases && entry.aliases.includes(command));

    // Check if it's a registered command.
    if (cmd) {
      cmd.execute(message, args, client);
    }
  } catch (error) {
    console.error(error);
    message.reply('Es ist ein unerwarteter Fehler aufgetreten. Goldi entschuldigt sich :(');
  }
};

client.on('ready', () => {
  console.log(`Connected as ${client.user.tag}`);
  client.user.setActivity(config.defaultActivity);
});

// Listen for incoming messages.
client.on('message', (message) => {
  // Don't respond to own bot messages
  if (message.author.bot) {
    return;
  }

  reactToEmojis(message);
  reactToCommands(message);
});

// Start the bot.
// Discord dev: @see https://discord.com/developers/applications
client.login(process.env.DISCORD_BOT_TOKEN);
