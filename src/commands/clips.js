module.exports = {
  name: 'clips',
  aliases: ['clip', 'highlights'],
  description: 'IAlle Clips vom Stream',
  execute(message) {
    const output = [];
    output.push('Alle Clips findest du hier: https://www.twitch.tv/goldman94/videos?filter=clips&range=all');
    output.push('Besondere Clips werden außerdem im Chanel <#811752663359684618> gepostet.');
    message.channel.send(output);
  },
};
