const { getStreamer, getFollowersCount } = require('../twitch');

module.exports = {
  name: 'stats',
  aliases: ['stat', 'statistik', 'server'],
  description: 'Erfahre mehr über den Stream',
  execute({ message }) {
    const { guild } = message.channel;

    // Twitch API
    getStreamer().then(async (streamer) => {
      console.log(streamer);
      const response = [];
      const stream = await streamer.getStream();
      response.push('**Informationen von Twitch:**');
      response.push(`Name: ${streamer.name}`);
      response.push(`Anzeigename: ${streamer.displayName}`);
      response.push(`Beschreibung: ${streamer.description}`);
      response.push(`Account erstellt am: ${streamer.creationDate}`);
      response.push(`Broadcaster-Typ: ${streamer.broadcasterType}`);
      response.push(`ID: ${streamer.id}`);
      response.push(`Follower: ${await getFollowersCount()}`);
      response.push(`Views: ${streamer.views}`);
      response.push(`Folgt: ${(await streamer.getFollows()).total} Personen`);
      if (stream === null) {
        response.push('Live: Nein');
      } else {
        response.push('Live: Ja');
        response.push(`Stream-Titel: ${stream.title}`);
        response.push(`Stream-Zuschauer: ${stream.viewers}`);
        response.push(`Stream-Start: ${stream.startDate}`);
        response.push(`Stream-Spiel: ${stream.gameName}`);
      }
      message.channel.send(response);
    });

    // Discord API
    if (guild !== undefined) {
      guild.members.fetch().then((fetchedMembers) => {
        const totalOnline = fetchedMembers.filter((member) => member.presence.status === 'online');

        const response = [];
        response.push('**Informationen von Discord:**');
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
    }
  },
};
