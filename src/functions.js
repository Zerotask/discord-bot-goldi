const config = require('../config.json');

/**
 * @param {number} minimum
 * @param {number} maximum
 * @returns {number}
 */
const getRandomNumber = (minimum, maximum) => Math.floor(Math.random()
  * (maximum - minimum)) + minimum;

/**
 * @param {object} client
 * @param {string} mention
 * @returns {object|null}
 */
const getUserFromMention = (client, mention) => {
  if (!mention) {
    return null;
  }

  if (mention.startsWith('<@') && mention.endsWith('>')) {
    let userId = mention.slice(2, -1);

    if (userId.startsWith('!')) {
      userId = userId.slice(1);
    }
    console.log(userId);
    return client.users.cache.get(userId);
  }

  return null;
};

/**
 * @param {Array}
 * @return {Array}
 */
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    // eslint-disable-next-line no-param-reassign
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

/**
 * @param {object} member
 * @returns {boolean}
 */
const isMod = (member) => member.roles.cache.some((role) => role.name === 'Mod' || role.name === 'Admin' || role.name === 'Goldman94');

/**
 * @param {string} userId
 * @returns {boolean}
 */
const isDeveloper = (userId) => config.developers.includes(userId);

const reactToEmojis = (message) => {
  const lowerCaseContent = message.content.toLowerCase();
  if (lowerCaseContent.includes('kappa')) {
    message.channel.send('https://i.kym-cdn.com/photos/images/newsfeed/000/925/494/218.png_large');
  } else if (lowerCaseContent.includes('lul')) {
    message.channel.send('https://freepngimg.com/thumb/league_of_legends/85483-twitch-emote-face-facial-john-expression-bain.png');
  } else if (lowerCaseContent.includes('pogchamp')) {
    message.channel.send('https://freepngimg.com/thumb/mouth/92712-ear-head-twitch-pogchamp-emote-free-download-png-hq-thumb.png');
  } else if (lowerCaseContent.includes('feelsbadman')) {
    message.channel.send('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt9RC-fEDF3xBlO3rRUGFzdX3T25ipBlHq9Q&usqp=CAU');
  } else if (lowerCaseContent.includes('🥳')) {
    message.channel.send(':partying_face: :partying_face: :partying_face:');
  }
};

/**
 * @param {object} client
 * @param {object} message
 * @returns {void}
 */
const reactToCommands = (client, message) => {
  // Besides reacting to emojis, ignore all non-commands.
  if (!message.content.startsWith(config.commandPrefix)) {
    return;
  }

  const args = message.content.slice(config.commandPrefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  try {
    const cmd = client.commands.get(command)
      || client.commands.find((entry) => entry.aliases && entry.aliases.includes(command));

    // Check if it's a registered command.
    if (cmd) {
      cmd.execute({ message, args, client });
    }
  } catch (error) {
    console.error(error);
    message.reply('Es ist ein unerwarteter Fehler aufgetreten. Goldi entschuldigt sich :(');
  }
};

/**
 * @param {object} message
 * @returns {void}
 */
const reactToMessages = (message) => {
  // If it's a command, ignore it.
  if (message.content.startsWith(config.commandPrefix)) {
    return;
  }

  const lowerCaseContent = message.content.toLowerCase();
  if (lowerCaseContent.includes('moin goldi') || lowerCaseContent.includes('hi goldi') || lowerCaseContent.includes('hallo goldi') || lowerCaseContent.includes('hey goldi') || lowerCaseContent.includes('servus goldi') || lowerCaseContent.includes('guten tag goldi') || lowerCaseContent.includes('guten abend goldi')) {
    message.reply('moin moin :blush:');
  } else if (lowerCaseContent.includes('dir auch goldi')) {
    message.reply('danke hihi :blush:');
  } else if (lowerCaseContent.includes('wie gehts goldi') || lowerCaseContent.includes('wie geht\'s goldi') || lowerCaseContent.includes('wie geht\'s dir goldi')) {
    message.reply('Mir geht es gut. Lieb, dass du fragst :blush: Wie geht es dir?');
  } else if (lowerCaseContent.includes('danke goldi')) {
    message.reply('Gerne :blush:');
  }
};

/**
 * @param {number} days
 * @returns {number}
 */
const getDateDaysBack = (days) => {
  const date = new Date();
  date.setDate(date.getDate() - days);

  return date;
};

/**
 * @param {number} value
 * @returns {string}
 */
const numberFormat = (value) => new Intl.NumberFormat(config.locale).format(value);

/**
 * @param {Date} value
 * @returns {string}
 */
const dateTimeFormatLong = (value) => new Intl.DateTimeFormat(config.locale, { dateStyle: 'full', timeStyle: 'long' }).format(value);

module.exports = {
  getRandomNumber,
  getUserFromMention,
  shuffleArray,
  isMod,
  isDeveloper,
  reactToEmojis,
  reactToCommands,
  reactToMessages,
  getDateDaysBack,
  numberFormat,
  dateTimeFormatLong,
};
