module.exports = {
  name: 'gta',
  aliases: ['hs', 'homestate'],
  description: 'Informationen über den GTA V Roleplay-Server HomeState',
  async execute({ message }) {
    const output = [];
    output.push('**FamilyLife - GTA V Roleplay - https://twitter.com/FamilyLifeRP**');
    output.push('Einreise: 04.10.2021 (legal)');
    output.push('Charakter: Anthony Goldman aka Ronny, Sachse, 27 Jahre');
    message.channel.send(output);
  },
};
