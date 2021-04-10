const getRandomNumber = (minimum, maximum) => Math.floor(Math.random() * (maximum - minimum)) + minimum;
const getUserFromMention = (client, mention) => {
    if (!mention) return;

    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);

        if (mention.startsWith('!')) {
            mention = mention.slice(1);
        }

        return client.users.cache.get(mention);
    }
}

module.exports = { getRandomNumber, getUserFromMention }