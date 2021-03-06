const fetch = require('node-fetch');

module.exports = {
  name: 'dad',
  aliases: ['vater', 'dadjoke', 'vater-witz', 'vaterwitz', 'dad-joke'],
  description: 'Zeige einen random dad joke',
  execute({ message }) {
    fetch('https://icanhazdadjoke.com/', {
      headers: { Accept: 'application/json' },
    })
      .then((res) => res.json())
      .then((body) => {
        if (body.joke) {
          message.channel.send(body.joke);
        } else {
          message.channel.send('Heute habe ich keinen dad joke für dich :(');
        }
      });
  },
};
