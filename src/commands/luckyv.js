const fetch = require('node-fetch');
const { numberFormat } = require('../functions');

module.exports = {
  name: 'luckyv',
  aliases: ['lucky', 'luckyv-streamer', 'lucky-streamer'],
  description: 'Informationen über den GTA V Roleplay-Server LuckyV',
  async execute({ message }) {
    const results = await Promise.all([
      fetch('https://api.altv.mp/servers/list'),
      fetch('https://luckyv-streamer.frozenpenguin.media/api.php'),
    ]);
    const altvData = await results[0].json();
    const luckyVStreamersData = await results[1].json();

    const altvServer = altvData.find((entry) => entry.name.includes('LuckyV'));
    const output = [];
    output.push('**LuckyV - GTA V Roleplay**');
    output.push(`Spieler online: **${numberFormat(altvServer.players)}**`);
    output.push(`Streams online: **${numberFormat(luckyVStreamersData.online)}** (${numberFormat(luckyVStreamersData.viewer)} Zuschauer)`);
    output.push(`Streams offline: ${numberFormat(luckyVStreamersData.offline)}`);
    output.push(`alt:V-Version: ${altvServer.version}`);
    output.push('Alle Streams im Überblick: https://luckyv-streamer.frozenpenguin.media');
    message.channel.send(output);
  },
};
