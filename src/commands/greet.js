module.exports = {
    name: 'greet',
    description: 'Greet another person',
    execute(message, args) {
        message.channel.send(`Hallo ${args[0]} :)`);
    },
};