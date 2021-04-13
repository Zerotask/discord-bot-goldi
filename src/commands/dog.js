const { getUserFromMention } = require('../functions');
const fetch = require('node-fetch');

module.exports = {
    name: 'dog',
    aliases: ['hund', 'wuff', 'woof'],
    description: 'Zeige ein random dog pic',
    execute(message, args, client) {
        fetch('https://random.dog/woof.json')
            .then(res => res.json())
            .then(body => {
                if (body.url) {
                    console.log(body);
                    message.channel.send(body.url);
                } else {
                    message.channel.send('Heute habe ich keinen Hund für dich :(');
                }
            });
    },
};