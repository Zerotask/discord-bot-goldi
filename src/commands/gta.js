const fetch = require('node-fetch');
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
      ]);
    } catch (error) {
      console.log({ error });
      message.channel.send('Die Daten können derzeit nicht abgerufen werden. :( Versuche es später noch einmal.');
      return;
    }

    const altvData = await results[0].json();
    // const luckyVStreamersData = await results[1].json();

    const altvServer = altvData.find((entry) => entry.name.includes('HomeState'));
    const output = [];
    output.push('**HomeState - GTA V Roleplay - https://www.homestate.eu/forum/**');
    output.push(`Spieler online: **${numberFormat(altvServer.players)}**`);
    output.push('Stream-Übersicht: https://www.homestate.eu/index.php?ha-streaming-partner/&pageNo=1&sortField=twitchPartnerLastStream&sortOrder=DESC');
    // output.push(`Streams online: **${numberFormat(luckyVStreamersData.online)}**
    // (${numberFormat(luckyVStreamersData.viewer)} Zuschauer)`);
    // output.push(`Streams offline: ${numberFormat(luckyVStreamersData.offline)}`);
    output.push(`alt:V-Version: ${altvServer.version}`);
    output.push('Einreise: 18.08.2021 (illegal über das Gefängnis)');
    output.push('Charakter: (Name noch unbekannt), (Alter noch unbekannt), Crime');
    message.channel.send(output);
  },
};
