// Load environment variables
require('dotenv').config();

// Connect to db
require('./db');

// Load packages
const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');
const cron = require('node-cron');
const config = require('../config.json');
const { reactToEmojis, reactToCommands } = require('./functions');

// Init discord
const client = new Discord.Client();
client.commands = new Discord.Collection();

// Register commands.
const commandsPath = path.resolve('./src/commands');
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));
commandFiles.forEach((file) => {
  const command = require(`${commandsPath}/${file}`);
  client.commands.set(command.name, command);
});
// for (const file of commandFiles) {
//   const command = require(`${commandsPath}/${file}`);
//   client.commands.set(command.name, command);
// }

// Start the bot.
// Discord dev: @see https://discord.com/developers/applications
client.login(process.env.DISCORD_BOT_TOKEN);

client.on('ready', () => {
  console.log(`Connected as ${client.user.tag}`);
  client.user.setActivity(config.defaultActivity);

  const mainChannel = client.channels.cache.get('575701911433510912');

  // Monday reminder
  cron.schedule('* 10 * * 1', () => {
    mainChannel.send('Ich wünsche euch allen einen guten Start in die Woche :blush: Bleibt alle gesund!');
  });

  // Wednesday reminder
  cron.schedule('* 14 * * 3', () => {
    mainChannel.send('It is wednesday my dudes :frog: :frog: :frog:');
  });

  // Friday reminder
  cron.schedule('* 18 * * 5', () => {
    mainChannel.send('ich wünsche euch allen einen schönes Wochenende :partying_face:');
  });
});

// Listen for incoming messages.
client.on('message', (message) => {
  // Don't respond to own bot messages
  if (message.author.bot) {
    return;
  }

  reactToEmojis(message);
  reactToCommands(client, message);
});
