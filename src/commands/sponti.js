const { getRandomNumber } = require('../functions');

module.exports = {
  name: 'sponti',
  description: 'Gibt es heute noch einen spontanen Stream? Goldi verräts dir ;)',
  execute({ message }) {
    const chance = getRandomNumber(0, 100);
    message.channel.send(`Es gibt heute zu ${chance}% noch einen Sponti.`);
    if (chance < 40) {
      message.channel.send('Ich glaube, das wird heute nichts mehr :cry:');
    } else if (chance >= 40 && chance < 80) {
      message.channel.send('Die Chancen stehen ganz gut :thinking:');
    } else if (chance >= 80) {
      message.channel.send('Er wird sicherlich jeden Moment den Stream starten :partying_face:');
    }
  },
};
