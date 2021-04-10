const { getRandomNumber } = require('../functions');

module.exports = {
    name: 'sponti',
    description: 'Random sponti stream generator',
    execute(message, args) {
        message.channel.send(`Es gibt heute zu ${getRandomNumber(70, 100)}% noch einen Sponti.`);
    },
};