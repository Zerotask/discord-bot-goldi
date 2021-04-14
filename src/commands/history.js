const fetch = require('node-fetch');
const { shuffleArray } = require('../functions');

const cache = {};

const getRandomEvents = (cacheKey, number) => {
  const shuffledArray = shuffleArray(cache[cacheKey]);
  return shuffledArray.slice(0, number);
};

const outputEvents = (message, events) => {
  const output = [];
  const date = new Date();
  output.push(`Hier sind ${events.length} zufällige historische Ereignisse für den heutigen Tag (${date.getDate()}.${date.getMonth() + 1}):`);
  for (const event of events) {
    output.push(`${event.year}: ${event.text}`);
  }

  message.channel.send(output);
};

module.exports = {
  name: 'history-events',
  aliases: ['historyevents', 'history', 'geschichte', 'geschichtsereignisse'],
  description: 'Zeige Geschichtsereignisse vom heutigen Tag',
  example: '3',
  execute(message, args) {
    const date = new Date();
    const month = date.getMonth() + 1;
    const dayOfMonth = date.getDate();
    const cacheKey = `${month}_${dayOfMonth}`;
    const numberOfEvents = Math.min(parseInt(args[0] || 5, 10), 10);

    // Cache entry found
    if (cache[cacheKey] !== undefined) {
      outputEvents(message, getRandomEvents(cacheKey, numberOfEvents));
    } else {
      fetch(`https://history.muffinlabs.com/date/${month}/${dayOfMonth}`)
        .then((res) => res.json())
        .then((body) => {
          cache[cacheKey] = body.data.Events;
          outputEvents(message, getRandomEvents(cacheKey, numberOfEvents));
        });
    }
  },
};
