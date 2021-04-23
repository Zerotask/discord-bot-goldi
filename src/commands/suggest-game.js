const { getRandomNumber } = require('../functions');

module.exports = {
  name: 'suggest-game',
  description: 'Goldi schlägt dir ein zufälliges Spiel vor',
  execute(message) {
    const gameList = ['WoW', 'GTA RP', 'EU4', 'CK3', 'AoE 2 (4)'];
    message.channel.send(`Goldi schlägt dir ${gameList[getRandomNumber(0, gameList.length)]} vor :)`);
  },
};
