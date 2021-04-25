const discord = require('discord.js');
const { getUserFromMention } = require('../functions');

module.exports = {
  name: 'multitwitch',
  aliases: ['multi-twitch', 'multi'],
  description: 'Erzeuge einen multitwitch.tv Link',
  example: 'DaliMann',
  execute(message, args, client) {
    if (!args.length) {
      message.reply('Du musst mindestens einen Streamer angeben.');
      return;
    }

    let baseUrl = 'https://multitwitch.tv/goldman94';

    args.forEach((arg) => {
      const user = getUserFromMention(client, arg);
      const userName = user instanceof discord.User ? user.username : arg;
      baseUrl += `/${userName}`;
    });

    const response = [];
    response.push('Schaue mit MultiTwitch mehrere Streams gleichzeitig!');
    response.push(`:arrow_right: ${baseUrl}`);
    message.channel.send(response);
  },
};
