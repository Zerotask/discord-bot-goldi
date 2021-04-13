const { getUserFromMention } = require('../functions');
const fetch = require('node-fetch');

module.exports = {
    name: 'dad-joke',
    aliases: ['dad', 'dadjoke', 'vater-witz', 'vaterwitz'],
    description: 'Zeige einen random dad joke',
    execute(message, args, client) {
        fetch('https://icanhazdadjoke.com/', {
            headers: { 'Accept': 'application/json' },
        })
            .then(res => res.json())
            .then(body => {
                if (body.joke) {
                    console.log(body);
                    message.channel.send(body.joke);
                } else {
                    message.channel.send('Heute habe ich keinen dad joke für dich :(');
                }
            });
    },
};