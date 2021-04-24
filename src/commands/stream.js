const config = require('../../config');

module.exports = {
  name: 'stream',
  aliases: ['wochenplan', 'streamzeiten', 'streamer'],
  description: 'Informationen über den Stream',
  execute(message) {
    const output = [];
    output.push('Den Stream findest du hier: https://www.twitch.tv/goldman94');
    output.push(`Der Wochenplan findest du im Channel <#${config.channels.streamWeekPlan}>`);
    output.push(`Bei weiteren Fragen wende dich einfach an unsere <@&${config.roles.mod}>s :)`);
    message.channel.send(output);
  },
};
