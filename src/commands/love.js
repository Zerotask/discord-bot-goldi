const { getRandomNumber } = require('../functions');

module.exports = {
    name: 'love',
    description: 'Random love generator',
    execute(message, args) {
        message.channel.send(`${args[0]} liebt ${args[1]} zu ${getRandomNumber(0, 100)}% <3`);
    },
};