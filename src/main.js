/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
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
const { reactToEmojis, reactToCommands, reactToMessages } = require('./functions');

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

// Start the bot.
// Discord dev: @see https://discord.com/developers/applications
client.login(process.env.DISCORD_BOT_TOKEN);

client.on('ready', () => {
  console.log(`Connected as ${client.user.tag}`);
  client.user.setActivity(config.defaultActivity);

  const mainChannel = client.channels.cache.get(config.channels.general);
  // const botTestingChannel = client.channels.cache.get(config.channels.botTesting);

  const cronOptions = {
    timezone: 'Europe/Berlin',
  };

  // Monday 10:00
  cron.schedule('0 10 * * 1', () => {
    mainChannel.send('Ich wünsche euch allen einen guten Start in die Woche :blush: Bleibt alle gesund!');
  }, cronOptions);

  // Friday 18:00
  cron.schedule('0 18 * * 5', () => {
    mainChannel.send('Ich wünsche euch allen ein schönes Wochenende :partying_face:');
  }, cronOptions);

  // Sunday 19:00
  cron.schedule('0 19 * * 7', () => {
    const info = [];
    info.push('Ich hoffe, dass ihr alle eine tolle Woche hattet! :blush:');
    info.push('Mit den Befehlen `!commands` oder `!help` erfährt ihr, wie ihr mit mir interagieren könnt.');
    info.push(`Wollt ihr wissen, an welchen Tagen und welches Spiel gestreamt wird? Dann klickt einfach hier: <#${config.channels.streamWeekPlan}>`);
    info.push(`Die Regeln findet ihr hier: <#${config.channels.rules}>. Falls jemand dagegen verstößt oder euch belästigt, könnt ihr mit !report denjenigen melden, z. B. \`!report @Goldi hat mir unanständige Nachrichten geschickt\``);
    info.push(`Du bist eher der cringe Typ? Dann komm doch in den Channel <#${config.channels.cringer}>. Für weitere Information schreibe \`!cringer help\``);
    info.push(`Die Highlights der vergangen Streams kannst du dir im Channel <#${config.channels.clips}> anschauen. Weitere Clips findest du über \`!clips\``);
    mainChannel.send(info);
  }, cronOptions);
});

// Listen for incoming messages.
client.on('message', (message) => {
  // Don't respond to own bot messages
  if (message.author.bot) {
    return;
  }

  reactToEmojis(message);
  reactToCommands(client, message);
  reactToMessages(message);
});
