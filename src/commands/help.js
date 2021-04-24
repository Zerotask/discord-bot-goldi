const Discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: 'help',
  description: 'Liste alle commands auf.',
  aliases: ['command', 'commands'],
  example: 'cringer',
  execute(message, args, client) {
    const { commands } = client;
    let response = [];
    const prefix = config.commandPrefix;

    response.push(message.author);

    // If someone wants help for a specific command.
    if (args.length) {
      const name = args[0].toLowerCase();
      const command = commands.get(name)
      || commands.find((c) => c.aliases && c.aliases.includes(name));

      if (!command) {
        return message.channel.send('Das ist kein gültiger command.');
      }
      const embedFields = [];
      if (command.aliases) {
        embedFields.push({ name: 'Aliases', value: command.aliases.join(', ') });
      }

      if (command.description) {
        embedFields.push({ name: 'Beschreibung', value: command.description });
      }

      embedFields.push({ name: 'Beispiel', value: `\`${prefix}${command.name} ${command.example || ''}\`` });

      response = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`Hilfe für den Befehl \`${command.name}\` :blush:`)
        .addFields(embedFields);
    } else {
      // General help information
      response = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Übersicht über alle meine Befehle :blush:')
        .addFields(
          { name: 'Befehle', value: commands.map((command) => prefix + command.name).join(', ') },
          { name: 'Hilfe zu einem bestimmten Befehl', value: `Du kannst auch ${prefix}help <command> nutzen, um weitere Informationen zu erhalten, z. B. \`!help report\` :)` },
        );
    }

    return message.channel.send(response);
  },
};
