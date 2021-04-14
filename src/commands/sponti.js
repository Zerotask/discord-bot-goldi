const { getRandomNumber } = require('../functions');

module.exports = {
  name: 'sponti',
  description: 'Gibt es heute noch einen spontanen Stream? Goldi verräts dir ;)',
  execute(message) {
    message.channel.send(`Es gibt heute zu ${getRandomNumber(70, 100)}% noch einen Sponti.`);
  },
};
