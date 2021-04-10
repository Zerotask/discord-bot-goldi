module.exports = {
    name: 'greet',
    aliases: ['hello', 'hallo'],
    description: 'Grüße eine andere Person',
    example: '@Ragath',
    execute(message, args) {
        message.channel.send(`Hallo ${args[0] || message.author.username} :)`);
    },
};