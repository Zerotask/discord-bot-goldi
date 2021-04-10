const config = require('../../config.json');

module.exports = {
    name: 'help',
    description: 'Liste alle commands auf.',
    aliases: ['command', 'commands'],
    usage: '[command name]',
    cooldown: 5,
    execute(message, args, client) {
        const commands = client.commands;
        const response = [];
        const prefix = config.commandPrefix;

        response.push(message.author);

        // If someone wants help for a specific command.
        if (args.length) {
            const name = args[0].toLowerCase();
            const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

            if (!command) {
                return message.channel.send('Das ist kein gültiger command.');
            } else {
                response.push(`**Command:** ${command.name}`);
                if (command.aliases) {
                    response.push(`**Aliases:** ${command.aliases.join(', ')}`);
                }

                if (command.description) {
                    response.push(`**Beschreibung:** ${command.description}`);
                }

                response.push(`**Beispiel:** ${prefix}${command.name} ${command.example || ''}`);
            }
        } else {
            // General help information
            response.push('Hier ist eine Liste mit allen commands, mit denen du mich benutzen kannst:');
            response.push(commands.map(command => prefix + command.name).join(', '));
            response.push(`Du kannst auch ${prefix}help <command> nutzen, um weitere Informationen zu erhalten. :)`);

        }

        return message.channel.send(response, { split: true });
    },
};

