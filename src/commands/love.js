const { getRandomNumber } = require('../functions');

module.exports = {
    name: 'love',
    description: 'Random love generator',
    execute(message, args) {
        const love = getRandomNumber(0, 100);
        let response = `${args[0] || message.author.username} liebt ${args[1] || message.author.username} zu ${love}% `

        if (love <= 20) {
            response += ':( FeelsBadMan';
        } else if (love > 20 && love <= 60) {
            response += ':/';
        } else if (love > 60 && love <= 90) {
            response += ':)';
        } else {
            response += ':) FeelsGoodMan <3';
        }

        message.channel.send(response);
    },
};