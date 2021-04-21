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
  // const botTestingChannel = client.channels.cache.get('803680168991916112');

  const cronOptions = {
    timezone: 'Europe/Berlin',
  };

  // Monday reminder
  cron.schedule('0 10 * * 1', () => {
    mainChannel.send('Ich wünsche euch allen einen guten Start in die Woche :blush: Bleibt alle gesund!');
  }, cronOptions);

  // Wednesday reminder
  cron.schedule('0 14 * * 3', () => {
    mainChannel.send('It is wednesday my dudes :frog: :frog: :frog:');
  });

  // Friday reminder
  cron.schedule('0 18 * * 5', () => {
    mainChannel.send('ich wünsche euch allen einen schönes Wochenende :partying_face:');
  }, cronOptions);

  // Sunday reminder
  cron.schedule('0 20 * * 7', () => {
    const info = [];
    info.push('ich hoffe, dass ihr alle eine tolle Woche hattet! :blush:');
    info.push('Falls ihr wissen wollt, mit welchen Kommandos ihr mich benutzen könnt, schreibt einfach !commands in den Chat.');
    info.push('Wollt ihr wissen, an welchen Tagen und welches Spiel gestreamt wird? Dann klickt einfach hier: <#810479229607084062>');
    info.push('Du bist eher der cringe Typ? Dann komm doch in den Channel <#833389402532216873>. Für weitere Information !cringer help');
    info.push('Die Regeln findet ihr hier: <#803677596898164786>. Falls jemand dagegen verstößt oder euch belästigt, könnt ihr mit !report denjenigen melden, z. B. `!report @Goldi hat mir unanständige Nachrichten geschickt`');
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
