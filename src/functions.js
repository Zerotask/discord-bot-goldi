const getRandomNumber = (minimum, maximum) => Math.floor(Math.random() * (maximum - minimum)) + minimum;

const getUserFromMention = (client, mention) => {
  if (!mention) {
    return;
  }

  if (mention.startsWith('<@') && mention.endsWith('>')) {
    mention = mention.slice(2, -1);

    if (mention.startsWith('!')) {
      mention = mention.slice(1);
    }

    return client.users.cache.get(mention);
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

module.exports = {
  getRandomNumber, getUserFromMention, shuffleArray, isMod,
};
