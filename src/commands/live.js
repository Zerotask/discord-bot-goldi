const { isMod } = require('../functions');

module.exports = {
  name: 'live',
  description: 'Informiere andere, dass goldman94 live ist.',
  execute(message) {
    if (isMod(message.member)) {
      const output = [];
      output.push('<:Krone_2:829297770354442251><:atk:813385698945925150><:Krone_2:829297770354442251><:atk:813385698945925150>');
      output.push('@everyone goldman94 ist live on Twitch!');
      output.push('https://www.twitch.tv/goldman94');
      output.push('<:Krone_2:829297770354442251><:atk:813385698945925150><:Krone_2:829297770354442251><:atk:813385698945925150>');
      message.channel.send(output);
    } else {
      message.reply('Tut mir leid, aber nur Mods können diesen Befehl ausführen.');
    }
  },
};
