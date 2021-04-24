const { isDeveloper } = require('../functions');

module.exports = {
  name: 'debug',
  aliases: ['dev'],
  description: 'Debug-Informationen über den Server',
  execute(message, args, client) {
    if (isDeveloper(message.author.id)) {
      let response = [];
      response.push('**MESSAGE OBJECT:**');
      response.push(JSON.stringify(message));
      response.push('');
      message.channel.send(response);

      response = [];
      response.push('**AUTHOR OBJECT:**');
      response.push(JSON.stringify(message.author));
      response.push('');
      message.channel.send(response);

      response = [];
      response.push('**CLIENT OBJECT:**');
      response.push(JSON.stringify(client));
      message.channel.send(response);
    } else {
      message.reply('Du musst ein Entwickler sein, um diesen Befehl auszuführen.');
    }
  },
};
