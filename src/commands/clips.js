module.exports = {
  name: 'clips',
  aliases: ['clip', 'highlights'],
  description: 'IAlle Clips vom Stream',
  execute(message) {
    const output = [];
    output.push('Alle Clips findest du hier: https://www.twitch.tv/goldman94/videos?filter=clips&range=all');
    output.push('Besondere Clips werden außerdem im Chanel <#811752663359684618> gepostet.');
    output.push('Den neuen YoutTube-Kanel findest du hier: https://www.youtube.com/user/Darkenemy22');
    message.channel.send(output);
  },
};
