module.exports = {
  name: 'stream',
  aliases: ['wochenplan', 'streamzeiten', 'streamer'],
  description: 'Informiere über den Stream',
  execute(message) {
    const output = [];
    output.push('Der Stream findest du hier: https://www.twitch.tv/goldman94');
    output.push('Der Wochenplan findest du im Channel <#810479229607084062>');
    output.push('Bei weiteren Fragen wende dich einfach an unsere Mods :)');
    message.channel.send(output);
  },
};
