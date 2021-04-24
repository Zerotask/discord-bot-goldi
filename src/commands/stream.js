module.exports = {
  name: 'stream',
  aliases: ['wochenplan', 'streamzeiten', 'streamer'],
  description: 'Informationen über den Stream',
  execute(message) {
    const output = [];
    output.push('Den Stream findest du hier: https://www.twitch.tv/goldman94');
    output.push('Der Wochenplan findest du im Channel <#810479229607084062>');
    output.push('Bei weiteren Fragen wende dich einfach an unsere <@&803005364366213171>s :)');
    message.channel.send(output);
  },
};
