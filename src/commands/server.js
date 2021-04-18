module.exports = {
  name: 'server',
  aliases: ['server-infos', 'discord', 'discord-server'],
  description: 'Gebe Informationen zum Discord-Server aus',
  execute(message) {
    const { guild } = message.channel;
    const response = [];
    response.push(`Name: ${guild.name}`);
    response.push(`Anzahl User: ${guild.memberCount}`);
    response.push(`Anzahl Channels: ${guild.channels.cache.size}`);
    response.push(`Anzahl Rollen: ${guild.roles.cache.size}`);
    response.push(`Sprache: ${guild.preferredLocale}`);
    message.channel.send(response);
  },
};
