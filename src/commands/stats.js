const { getStreamer } = require('../twitch');

module.exports = {
  name: 'stats',
  aliases: ['stat', 'statistik'],
  description: 'Erfahre mehr über den Stream',
  execute(message) {
    getStreamer().then(async (streamer) => {
      const response = [];
      response.push(`Name: ${streamer.name}`);
      response.push(`Anzeigename: ${streamer.displayName}`);
      response.push(`Beschreibung: ${streamer.description}`);
      response.push(`Account erstellt am: ${streamer.creationDate}`);
      response.push(`Broadcaster-Typ: ${streamer.broadcasterType}`);
      response.push(`ID: ${streamer.id}`);
      response.push(`Views: ${streamer.views}`);
      response.push(`Folgt: ${(await streamer.getFollows()).total} Personen`);
      response.push(`Live: ${(await streamer.getStream()) !== null}`);
      message.channel.send(response);
    });
  },
};
