const config = require('../../config.json');

module.exports = {
  name: 'stream',
  aliases: ['wochenplan', 'streamzeiten', 'streamer'],
  description: 'Informationen über den Stream',
  execute({ message }) {
    const response = [];
    response.push('Den Stream findest du hier: https://www.twitch.tv/goldman94');
    response.push(`Der Wochenplan findest du im Channel <#${config.channels.streamWeekPlan}>`);
    response.push(`Bei weiteren Fragen wende dich einfach an unsere <@&${config.roles.mod}>s :)`);
    message.channel.send(response);
  },
};
