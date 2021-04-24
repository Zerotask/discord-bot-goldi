const { getUserFromMention } = require('../functions');

module.exports = {
  name: 'bill',
  aliases: ['belikebill', 'be-like', 'be-like-bill'],
  description: 'Be like Bill.',
  example: 'kathrin f',
  execute(message, args, client) {
    let name = message.author.username || 'Unbekannt';
    if (args[0]) {
      name = getUserFromMention(client, args[0])?.username;
    }

    let sex = args[1] || 'm';
    if (sex === 'w') {
      sex = 'f';
    }

    message.channel.send(`https://belikebill.ga/billgen-API.php?default=1&name=${name}&sex=${sex}`);
  },
};
