const config = require('../../config');

module.exports = {
  name: 'clips',
  aliases: ['clip', 'highlights'],
  description: 'Alle Clips vom Stream',
  execute(message) {
    const output = [];
    output.push('Alle Clips findest du hier: https://www.twitch.tv/goldman94/videos?filter=clips&range=all');
    output.push(`Besondere Clips werden außerdem im Chanel <#${config.channels.streamWeekPlan}> gepostet.`);
    output.push('Den neuen YoutTube-Kanel findest du hier: https://www.youtube.com/user/Darkenemy22');
    message.channel.send(output);
  },
};
