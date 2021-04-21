const config = require('../config.json');

const getRandomNumber = (minimum, maximum) => Math.floor(Math.random() * (maximum - minimum)) + minimum;

const getUserFromMention = (client, mention) => {
  if (!mention) {
    return;
  }

  if (mention.startsWith('<@') && mention.endsWith('>')) {
    let userId = mention.slice(2, -1);

    if (mention.startsWith('!')) {
      userId = userId.slice(1);
    }

    return client.users.cache.get(userId);
  }
};

const shuffleArray = (array) => {
  let curId = array.length;
  // There remain elements to shuffle
  while (curId !== 0) {
    // Pick a remaining element
    const randId = Math.floor(Math.random() * curId);
    curId -= 1;
    // Swap it with the current element.
    const tmp = array[curId];
    array[curId] = array[randId];
    array[randId] = tmp;
  }
  return array;
};

const isMod = (member) => member.roles.cache.some((role) => role.name === 'Mod');

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
      cmd.execute(message, args, client);
    }
  } catch (error) {
    console.error(error);
    message.reply('Es ist ein unerwarteter Fehler aufgetreten. Goldi entschuldigt sich :(');
  }
};

const reactToMessages = (message) => {
  const lowerCaseContent = message.content.toLowerCase();

  if (lowerCaseContent.includes('moin goldi') || lowerCaseContent.includes('hi goldi') || lowerCaseContent.includes('hallo goldi') || lowerCaseContent.includes('hey goldi')) {
    message.reply('moin moin :blush:');
  } else if (lowerCaseContent.includes('dir auch goldi')) {
    message.reply('danke hihi :blush:');
  } else if (lowerCaseContent.includes('wie gehts goldi') || lowerCaseContent.includes('wie geht\'s goldi') || lowerCaseContent.includes('wie geht\'s dir goldi')) {
    message.reply('Mir geht es gut. Lieb, dass du fragst :blush: Wie geht es dir?');
  }
};

module.exports = {
  getRandomNumber,
  getUserFromMention,
  shuffleArray,
  isMod,
  reactToEmojis,
  reactToCommands,
  reactToMessages,
};
