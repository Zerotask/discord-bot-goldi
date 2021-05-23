module.exports = {
  name: 'ping',
  description: 'Ping!',
  execute({ message, client }) {
    message.channel.send(`Ping (ICMP Package): ${client.ws.ping}ms`).then((sent) => {
      message.channel.send(`Round Trip Time (RTT): ${sent.createdTimestamp - message.createdTimestamp}ms`);
    });
  },
};
