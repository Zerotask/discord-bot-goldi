const { isMod, getUserFromMention } = require('../functions');
const config = require('../../config.json');

module.exports = {
  name: 'ban',
  aliases: ['bann', 'bannen'],
  description: 'Banne einen User',
  example: '@DrNidzo',
  execute({ message, args, client }) {
    if (isMod(message.member)) {
      // You have to mention a user to ban
      if (args.length > 0 && message.mentions.users.size > 0) {
        const guild = client.guilds.cache.first();
        const bannedUser = getUserFromMention(client, args[0]);
        const banReason = args.slice(1).join(' ');

        if (bannedUser.id === '209292814599716865') {
          message.reply('Ich banne doch nicht meinen Vater!');
          return;
        }

        const responseDM = [];
        responseDM.push(`Du wurst von ${message.author.username} vom Server *${guild.name}* gebannt.`);

        const responseChannelReports = [];
        responseChannelReports.push(`:warning: ${message.author} hat den User ${bannedUser} vom Server gebannt.`);

        if (banReason) {
          const reason = `Begründung: ${banReason}`;
          responseDM.push(reason);
          responseChannelReports.push(reason);
        }

        try {
          guild.members.ban(bannedUser);

          bannedUser.send(responseDM);
          client.channels.cache.get(config.channels.reports).send(responseChannelReports);
          message.channel.send(`${bannedUser} wurde erfolgreich vom Server gebannt und via DM darüber informiert.`);
        } catch (error) {
          console.log(error);
          message.reply(`Fehler beim Bannen des Users ${bannedUser}`);
        }
      } else {
        message.reply('Du musst eine Person angeben');
      }
    } else {
      message.reply('Tut mir leid, aber nur Mods können diesen Befehl ausführen.');
    }
  },
};
