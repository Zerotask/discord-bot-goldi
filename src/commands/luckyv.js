const { parse } = require('node-html-parser');
const fetch = require('node-fetch');

module.exports = {
  name: 'luckyv',
  aliases: ['lucky', 'luckyv-streamer', 'lucky-streamer'],
  description: 'Informationen über den GTA V Roleplay-Server LuckyV',
  async execute({ message }) {
    const urls = {
      altV: 'https://api.altv.mp/servers/list',
      luckyVStreams: 'https://luckyv-streamer.frozenpenguin.media',
    };

    const results = await Promise.all([fetch(urls.altV), fetch(urls.luckyVStreams)]);
    const altvData = await results[0].json();
    const luckyVStreamersData = await results[1].text();

    const altvServer = altvData.find((entry) => entry.name.includes('LuckyV'));
    const luckVroot = parse(luckyVStreamersData);
    const output = [];
    output.push(`Spieler online: ${altvServer.players} / ${altvServer.maxPlayers}`);
    output.push(`altv-Version: ${altvServer.version}`);
    output.push('');
    output.push('**LuckyV-Streams:**');
    output.push(luckVroot.querySelectorAll('h1')[1].textContent);
    output.push(luckVroot.querySelectorAll('h1')[2].textContent);
    output.push(`Alle Streams im Überblick: ${urls.luckyVStreams}`);
    message.channel.send(output);
  },
};
