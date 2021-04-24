module.exports = {
  name: 'server',
  aliases: ['server-infos', 'discord', 'discord-server'],
  description: 'Gebe Informationen zum Discord-Server aus',
  execute(message) {
    const { guild } = message.channel;

    guild.members.fetch().then((fetchedMembers) => {
      const totalOnline = fetchedMembers.filter((member) => member.presence.status === 'online');

      const response = [];
      response.push(`Name: ${guild.name} (ID: ${guild.id})`);
      response.push(`Anzahl User: ${guild.memberCount} | davon gerade online: ${totalOnline.size}`);
      response.push(`Anzahl Channels: ${guild.channels.cache.size}`);
      response.push(`Anzahl Rollen: ${guild.roles.cache.size}`);
      response.push(`Sprache: ${guild.preferredLocale}`);
      response.push(`Region: ${guild.region}`);
      response.push(`Features: ${guild.features.join(', ')}`);
      response.push(`Premium Tier: ${guild.premiumTier} (${guild.premiumSubscriptionCount})`);
      message.channel.send(response);
    });
  },
};
