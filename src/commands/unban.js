const { isMod, getUserFromMention } = require('../functions');
const config = require('../../config.json');

module.exports = {
  name: 'unban',
  aliases: ['unbann', 'entbannen'],
  description: 'Entbanne einen User',
  example: '@DrNidzo',
  execute(message, args, client) {
    if (isMod(message.member)) {
      // You have to mention a user to ban
      if (args.length > 0 && message.mentions.users.size > 0) {
        const guild = client.guilds.cache.first();
        const unbannedUser = getUserFromMention(client, args[0]);
        const unbanReason = args.slice(1).join(' ');

        const responseDM = [];
        responseDM.push(`Du wurst von ${message.author.username} vom Server *${guild.name}* entbannt.`);

        const responseChannelReports = [];
        responseChannelReports.push(`:warning: ${message.author} hat den User ${unbannedUser} vom Server entbannt.`);

        if (unbanReason) {
          const reason = `Begründung: ${unbanReason}`;
          responseDM.push(reason);
          responseChannelReports.push(reason);
        }

        try {
          unbannedUser.send(responseDM);
          client.channels.cache.get(config.channels.reports).send(responseChannelReports);
          message.channel.send(`${unbannedUser} wurde erfolgreich vom Server entbannt und via DM darüber informiert.`);

          guild.members.unban(unbannedUser);
        } catch (error) {
          message.reply(`Fehler beim Bannen des Users ${unbannedUser}`);
        }
      } else {
        message.reply('Du musst eine Person angeben');
      }
    } else {
      message.reply('Tut mir leid, aber nur Mods können diesen Befehl ausführen.');
    }
  },
};
