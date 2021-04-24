const config = require('../../config');

module.exports = {
  name: 'report',
  aliases: ['melden'],
  description: 'Melde eine Person dem Goldman-Team',
  example: '@Goldi hat mir per DM einen verdächtigen Link geschickt!',
  execute(message, args, client) {
    // Check if an argument was passed
    if (args.length) {
      const reportMessage = [];
      reportMessage.push(`${message.author} möchte den User ${args.shift()} melden.`);

      if (message.channel.type === 'dm') {
        reportMessage.push('Diese Nachricht wurde via DM gemeldet.');
      } else {
        reportMessage.push(`Diese Nachricht wurde im channel <#${message.channel.id}> gemeldet.`);
      }

      // Check if any further information were passed
      if (args.length) {
        reportMessage.push('Begründung:');
        reportMessage.push(`**${args.join(' ')}**`);
      }

      client.channels.cache.get(config.channels.reports).send(reportMessage);
      message.reply('Danke für deine Meldung. Ich habe das Goldman-Team darüber informiert. :slight_smile:');
    } else {
      message.reply('Bei einer Meldung musst du zumindest eine Person nennen. Falls du Hilfe brauchst, schreibe: `!help report`');
    }
  },
};
