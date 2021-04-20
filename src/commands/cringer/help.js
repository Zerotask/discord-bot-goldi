const config = require('../../../config.json');

const show = (message, commandName) => {
  const response = [];
  response.push(':sparkling_heart: :sparkling_heart: Cringer - finde auch du deine große Liebe :sparkling_heart: :sparkling_heart:');
  response.push('');
  response.push('Nachfolgende Befehle kannst du mit Cringer nutzen:');
  response.push('');
  response.push(`**Beschreibung aktualisieren**: \`${config.commandPrefix}${commandName} beschreibung <text>\``);
  response.push(`**Beschreibung abrufen**: \`${config.commandPrefix}${commandName} beschreibung\``);
  response.push(`**Alter aktualisieren **: \`${config.commandPrefix}${commandName} alter <alter>\``);
  response.push(`**Alter abrufen**: \`${config.commandPrefix}${commandName} alter\``);
  response.push(`**Job aktualisieren **: \`${config.commandPrefix}${commandName} job <job>\``);
  response.push(`**Job abrufen**: \`${config.commandPrefix}${commandName} job\``);
  response.push(`**Geschlecht aktualisieren **: \`${config.commandPrefix}${commandName} geschlecht <geschlecht>\``);
  response.push(`**Geschlecht abrufen**: \`${config.commandPrefix}${commandName} geschlecht\``);
  response.push(`**Profil abrufen **: \`${config.commandPrefix}${commandName} profil\``);
  response.push(`**Profil zurücksetzen**: \`${config.commandPrefix}${commandName} profil reset\``);
  response.push(`**Alles zurücksetzen**: \`${config.commandPrefix}${commandName} reset\``);
  response.push(`**Cringer-Version abfragen**: \`${config.commandPrefix}${commandName} version\``);
  response.push(`**Gesendete Likes anzeigen**: \`${config.commandPrefix}${commandName} liked\``);
  response.push(`**Gesendete Likes zurücksetzen**: \`${config.commandPrefix}${commandName} liked reset\``);
  response.push(`**Erhaltene Likes anzeigen**: \`${config.commandPrefix}${commandName} likes\``);
  response.push(`**Matches anzeigen**: \`${config.commandPrefix}${commandName} matches\``);
  response.push(`**Anzahl der Leute anzeigen**: \`${config.commandPrefix}${commandName} users\``);
  response.push(`**Cringer Premium anzeigen**: \`${config.commandPrefix}${commandName} premium\``);
  response.push(`**In der Suche nicht mehr angezeigt werden**: \`${config.commandPrefix}${commandName} hide\``);
  response.push(`**In der Suche angezeigt werden**: \`${config.commandPrefix}${commandName} show\``);
  response.push(`**Cringer Game **: \`${config.commandPrefix}${commandName}\``);
  message.channel.send(response);
};

module.exports = { show };