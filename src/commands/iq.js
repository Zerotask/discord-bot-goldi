const { getRandomNumber } = require('../functions');

module.exports = {
    name: 'iq',
    description: 'Random IQ generator',
    execute(message, args) {
        message.channel.send(`Der IQ von ${args[0] || message.author.username} ist ${getRandomNumber(70, 150)}`);
    },
};