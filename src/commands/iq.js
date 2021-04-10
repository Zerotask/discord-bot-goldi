const { getRandomNumber } = require('../functions');

module.exports = {
    name: 'iq',
    description: 'Wie schlau ist die Person?',
    execute(message, args) {
        message.channel.send(`Der IQ von ${args[0] || message.author.username} ist ${getRandomNumber(70, 150)}`);
    },
};