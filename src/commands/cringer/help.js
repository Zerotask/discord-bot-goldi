const config = require('../../../config.json');

const show = (message) => {
  const response = [];
  response.push(':sparkling_heart: :sparkling_heart: Cringer - finde auch du deine große Liebe :sparkling_heart: :sparkling_heart:');
  response.push('');
  response.push('Nachfolgende Befehle kannst du mit Cringer nutzen:');
  response.push('');
  response.push(`**Beschreibung aktualisieren**: \`${config.commandPrefix}${this.name} beschreibung <text>\``);
  response.push(`**Beschreibung abrufen**: \`${config.commandPrefix}${this.name} beschreibung\``);
  response.push(`**Alter aktualisieren **: \`${config.commandPrefix}${this.name} alter <alter>\``);
  response.push(`**Alter abrufen**: \`${config.commandPrefix}${this.name} alter\``);
  response.push(`**Job aktualisieren **: \`${config.commandPrefix}${this.name} job <job>\``);
  response.push(`**Job abrufen**: \`${config.commandPrefix}${this.name} job\``);
  response.push(`**Geschlecht aktualisieren **: \`${config.commandPrefix}${this.name} geschlecht <geschlecht>\``);
  response.push(`**Geschlecht abrufen**: \`${config.commandPrefix}${this.name} geschlecht\``);
  response.push(`**Profil abrufen **: \`${config.commandPrefix}${this.name} profil\``);
  response.push(`**Profil zurücksetzen**: \`${config.commandPrefix}${this.name} profil reset\``);
  response.push(`**Alles zurücksetzen**: \`${config.commandPrefix}${this.name} reset\``);
  response.push(`**Cringer-Version abfragen**: \`${config.commandPrefix}${this.name} version\``);
  response.push(`**Gesendete Likes anzeigen**: \`${config.commandPrefix}${this.name} liked\``);
  response.push(`**Gesendete Likes zurücksetzen**: \`${config.commandPrefix}${this.name} liked reset\``);
  response.push(`**Erhaltene Likes anzeigen**: \`${config.commandPrefix}${this.name} likes\``);
  response.push(`**Matches anzeigen**: \`${config.commandPrefix}${this.name} matches\``);
  response.push(`**Anzahl der Leute anzeigen**: \`${config.commandPrefix}${this.name} users\``);
  response.push(`**Cringer Premium anzeigen**: \`${config.commandPrefix}${this.name} premium\``);
  response.push(`**Cringer Game **: \`${config.commandPrefix}${this.name}\``);
  message.channel.send(response);
};

module.exports = { show };
