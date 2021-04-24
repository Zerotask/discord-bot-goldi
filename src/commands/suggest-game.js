const { getRandomNumber } = require('../functions');

module.exports = {
  name: 'suggest-game',
  description: 'Goldi schlägt dir ein zufälliges Spiel vor',
  execute(message) {
    const gameList = ['World of Warcraft', 'GTA RP', 'Europa Universalis 4', 'Crusader Kings 3', 'Age of Empires 2 (4)', 'Hearts of Iron 4'];
    message.channel.send(`Ich schlage dir ${gameList[getRandomNumber(0, gameList.length)]} vor :blush:`);
  },
};
