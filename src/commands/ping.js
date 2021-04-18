module.exports = {
  name: 'ping',
  description: 'Ping!',
  execute(message, args, client) {
    message.channel.send(`Ping: ${client.ws.ping}ms`).then((sent) => {
      message.channel.send(`Roundtrip latency: ${sent.createdTimestamp - message.createdTimestamp}ms`);
    });
  },
};
