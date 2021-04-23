const Discord = require('discord.js');
const config = require('../../../config.json');

const show = (message, commandName) => {
  const embedResponse = new Discord.MessageEmbed()
    .setColor('#de2600')
    .setTitle(':sparkling_heart: :sparkling_heart: Übersicht zu allen Cringer-Befehlen :sparkling_heart: :sparkling_heart:')
    .addFields(
      { name: 'Beschreibung aktualisieren', value: `\`${config.commandPrefix}${commandName} beschreibung <text>\`` },
      { name: 'Beschreibung abrufen', value: `\`${config.commandPrefix}${commandName} beschreibung\`` },
      { name: 'Alter aktualisieren', value: `\`${config.commandPrefix}${commandName} alter <alter>\`` },
      { name: 'Alter abrufen', value: `\`${config.commandPrefix}${commandName} job\`` },
      { name: 'Job aktualisieren', value: `\`${config.commandPrefix}${commandName} job <job>\`` },
      { name: 'Job abrufen', value: `\`${config.commandPrefix}${commandName} job\`` },
      { name: 'Geschlecht aktualisieren', value: `\`${config.commandPrefix}${commandName} geschlecht <geschlecht>\`` },
      { name: 'Geschlecht abrufen', value: `\`${config.commandPrefix}${commandName} geschlecht\`` },
      { name: 'Profil abrufen', value: `\`${config.commandPrefix}${commandName} profil\`` },
      { name: 'Profil zurücksetzen', value: `\`${config.commandPrefix}${commandName} profil reset\`` },
      { name: 'Alles zurücksetzen', value: `\`${config.commandPrefix}${commandName} reset\`` },
      { name: 'Cringer-Version abrufen', value: `\`${config.commandPrefix}${commandName} version\`` },
      { name: 'Gesendete Likes anzeigen', value: `\`${config.commandPrefix}${commandName} liked\`` },
      { name: 'Gesendete Likes zurücksetzen', value: `\`${config.commandPrefix}${commandName} liked reset\`` },
      { name: 'Erhaltene Likes anzeigen', value: `\`${config.commandPrefix}${commandName} likes\`` },
      { name: 'Matches anzeigen', value: `\`${config.commandPrefix}${commandName} matches\`` },
      { name: 'Anzahl der Leute anzeigen', value: `\`${config.commandPrefix}${commandName} users\`` },
      { name: 'Cringer Premium anzeigen', value: `\`${config.commandPrefix}${commandName} premium\`` },
      { name: 'Cringer Premium kaufen', value: `\`${config.commandPrefix}${commandName} premium buy\`` },
      { name: 'In der Suche nicht mehr angezeigt werden', value: `\`${config.commandPrefix}${commandName} hide\`` },
      { name: 'In der Suche angezeigt werden', value: `\`${config.commandPrefix}${commandName}\`` },
      { name: 'Cringer Game', value: `\`${config.commandPrefix}${commandName}\`. Dir werden zufällige Leute von diesem Discord-Server angezeigt. Du hast dann **60 Sekunden** Zeit, um **Ja** zu schreiben, falls dir die Person gefällt. Bei einer anderen oder keiner Antwort, wird es als **Nein** gewertet. Hast du der anderen Person ein Like gesendet, wird sie darüber **nicht** informiert, jedoch kann sie die erhaltenen Likes mit \`!cringer likes\` abrufen. Erst sobald 2 Personen ein Match haben, werden sie zusätzlich zu einer Chat-Nachricht auch via Direktnachricht (DM) darüber informiert.` },
    );
  message.channel.send(embedResponse);
};

module.exports = { show };
