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

    const response = [];
    response.push(message.author);
    response.push(':sparkling_heart: :sparkling_heart: Cringer - finde auch du deine große Liebe :sparkling_heart: :sparkling_heart:');
    response.push('');
    response.push(`Gefällt dir ${randomUser.username} :question:`);
    response.push(randomUser.avatarURL());
    response.push(':arrow_right: Schreibe: Ja oder Nein');
    message.channel.send(response).then(() => {
      const filter = (m) => message.author.id === m.author.id;
      const listYes = ['ja', 'jaa', 'jo', 'jaaa', 'jaaaa', 'jaaaaa', 'jep', 'jip', 'jap', 'na klar', 'yes', 'jop', 'love', 'like', 'liebe', 'j', 'y'];

      // Wait 60 seconds for a reply.
      message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
        .then((messages) => {
          const answer = messages.first().content.toLowerCase().trim();
          if (listYes.includes(answer)) {
            // Send to channel
            message.reply(`Du hast ${randomUser.username} ein Like geschickt :heart:`);

            // send DM to the liked user
            randomUser.send(`Du hast bei Cringer ein Like von ${message.author.username} erhalten :heart:`);
          } else {
            message.channel.send('Bruder muss los :broken_heart:');
          }
        })
        .catch(() => {
          message.reply('Wie es scheint, kannst du dich wohl nicht entscheiden :thinking: Goldi ist auch noch Single :relaxed:');
        });
    });
  },
};
