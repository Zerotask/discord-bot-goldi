const fetch = require('node-fetch');
const { parse } = require('node-html-parser');
const { numberFormat } = require('../functions');

module.exports = {
  name: 'gta',
  aliases: ['hs', 'homestate'],
  description: 'Informationen über den GTA V Roleplay-Server HomeState',
  async execute({ message }) {
    let results;
    try {
      results = await Promise.all([
        fetch('https://api.altv.mp/servers/list'),
        fetch('https://homestate.statuspage.io'),
        fetch('https://www.homestate.eu/index.php?ha-streaming-partner/'),
      ]);
    } catch (error) {
      console.log({ error });
      message.channel.send('Die Daten können derzeit nicht abgerufen werden. :( Versuche es später noch einmal.');
      return;
    }

    const altvData = await results[0].json();
    const altvServer = altvData.find((entry) => entry.name.includes('HomeState'));

    const homeStateStatusPage = await results[1].text();
    const serverStatus = parse(homeStateStatusPage).querySelector('.page-status > .status').textContent.trim();

    const homeStateWebsite = await results[2].text();
    const streamCounter = parse(homeStateWebsite).querySelector('.boxMenuLink > .badgeUpdate').textContent.trim();

    const output = [];
    output.push('**HomeState - GTA V Roleplay - https://www.homestate.eu/forum/**');
    output.push(`Spieler online: **${numberFormat(altvServer.players)}**`);
    output.push(`Streams online: ${streamCounter ?? 0} (https://tinyurl.com/homestate-streams)`);
    output.push(`Server-Status: ${serverStatus ?? 'unbekannt'} (https://homestate.statuspage.io)`);
    output.push(`alt:V-Version: ${altvServer.version}`);
    output.push('Einreise: (noch unbekannt) (illegal über das Gefängnis)');
    output.push('Charakter: (Name noch unbekannt), (Alter noch unbekannt), Crime');
    message.channel.send(output);
  },
};
