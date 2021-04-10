module.exports = {
    name: 'cringer',
    description: 'Hast du ein Cringer match?',
    execute(message, args) {
        message.channel.send(`Tut mir leid ${args[0] || message.author.username}, aber du hast noch immer 0 Cringer matches :( Goldi würde dich aber matchen :)`);
    },
};