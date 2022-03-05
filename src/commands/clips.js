const config = require('../../config.json');

module.exports = {
  name: 'clips',
  aliases: ['clip', 'highlights'],
  description: 'Alle Clips vom Stream',
  execute({ message }) {
    const output = [];
    output.push('Alle Clips findest du hier: https://www.twitch.tv/goldman94/videos?filter=clips&range=all :movie_camera:');
    output.push(`Besondere Clips werden außerdem im Chanel <#${config.channels.clips}> gepostet.`);
    output.push('');
    output.push('Den YouTube-Kanel findest du hier: https://www.youtube.com/user/Darkenemy22');
    output.push('Den TikTok-Kanel findest du hier: https://vm.tiktok.com/ZMeQMxc8x/');
    message.channel.send(output);
  },
};
