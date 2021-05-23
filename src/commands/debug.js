const { isDeveloper } = require('../functions');

module.exports = {
  name: 'debug',
  aliases: ['dev'],
  description: 'Debug-Informationen über den Server',
  execute({ message, client }) {
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

      // Same as !ping command.
      message.channel.send(`Ping (ICMP Package): ${client.ws.ping}ms`).then((sent) => {
        message.channel.send(`Round Trip Time (RTT): ${sent.createdTimestamp - message.createdTimestamp}ms`);
      });
    } else {
      message.reply('Du musst ein Entwickler sein, um diesen Befehl auszuführen.');
    }
  },
};
