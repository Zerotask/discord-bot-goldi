const { getRandomNumber } = require('../functions');

module.exports = {
  name: 'cringer',
  aliases: ['cringe', 'match'],
  description: 'Hast du ein Cringer match?',
  execute(message, args, client) {
    // Get all users
    const userList = client.users.cache;

    // Delete bot and author from the user list.
    userList.delete(client.user.id);
    userList.delete(message.author.id);

    // Convert to array and get a random user
    const userListArray = Array.from(userList);
    const randomUser = userListArray[getRandomNumber(0, userListArray.length - 1)][1];

    const output = [];
    output.push(`Ist ${randomUser.username} dein nächstes Cringer Match :question:`);
    output.push(randomUser.avatarURL());
    output.push(':arrow_right: Schreibe: Ja oder Nein');
    message.channel.send(output).then(() => {
      const filter = (m) => message.author.id === m.author.id;
      const listYes = ['ja', 'jaa', 'jep', 'na klar', 'yes', 'jop', 'love', 'lile', 'liebe', 'j', 'y'];

      // Wait 120 seconds for a reply.
      message.channel.awaitMessages(filter, { time: 120000, max: 1, errors: ['time'] })
        .then((messages) => {
          const answer = messages.first().content.toLowerCase().trim();
          if (listYes.includes(answer)) {
            // Send to channel
            message.channel.send(`Du hast ${randomUser.username} ein Like geschickt :heart:`);

            // send DM to the liked user
            randomUser.send(`Du hast bei Cringer ein Like von ${message.author.username} erhalten :heart:`);
          } else {
            message.channel.send('Bruder muss los :broken_heart:');
          }
        })
        .catch(() => {
          message.channel.send('Es ist ein unerwarteter Fehler aufgetreten. Goldi entschuldigt sich :(');
        });
    });
  },
};
