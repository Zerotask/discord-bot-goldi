const { getUser } = require('./functions');
const like = require('./like');
const match = require('./match');
const { Cringer } = require('../../entities/cringer');

const getNextUser = async (userId, userPool) => {
  const user = await getUser(userId);
  let nextUser;

  // userPool is empty. Refresh it.
  if (!user.userPool.length) {
    // Reload user list
    nextUser = userPool.pop();
    await Cringer.findOneAndUpdate({ userId }, {
      userPool,
    });

    return nextUser;
  }

  // Get last user from pool.
  nextUser = user.userPool.pop();

  // Update userPool
  await Cringer.findOneAndUpdate({ userId }, {
    userPool: user.userPool,
  });

  return nextUser;
};

const play = async (message, userId, userPool, userList) => {
  const nextUserId = await getNextUser(userId, userPool);
  const nextUser = userList.get(nextUserId);
  const nextUserProfile = await getUser(nextUserId, nextUser.username);
  const ownUserProfile = await getUser(userId);

  let response = [];
  response.push(message.author);
  response.push(':sparkling_heart: :sparkling_heart: Cringer - finde auch du deine große Liebe :sparkling_heart: :sparkling_heart:');
  response.push('');
  response.push(`Name: ${nextUser.username}`);
  if (nextUserProfile !== null) {
    response.push(`Geschlecht: ${nextUserProfile.gender}`);
    response.push(`Alter: ${nextUserProfile.age}`);
    response.push(`Job: ${nextUserProfile.job}`);
    response.push(`Beschreibung: ${nextUserProfile.description}`);
  }

  response.push(nextUser.avatarURL());
  response.push(':arrow_right: Schreibe: Ja oder Nein');

  // Send message and wait for user's reply.
  message.channel.send(response).then(() => {
    const filter = (m) => message.author.id === m.author.id;
    const listYes = ['ja', 'jaa', 'jo', 'jaaa', 'jaaaa', 'jaaaaa', 'jep', 'jip', 'jap', 'na klar', 'yes', 'jop', 'love', 'like', 'liebe', 'j', 'y'];

    // Wait 60 seconds for a reply.
    message.channel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
      .then(async (messages) => {
        const answer = messages.first().content.toLowerCase().trim();
        if (listYes.includes(answer)) {
          like.addLikeReceived(userId, nextUserId, nextUser.username);
          like.addLikeSent(userId, nextUserId);
          // Send to channel
          message.reply(`Du hast ${nextUser.username} ein Like geschickt :heart:`);

          // send DM to the liked user
          if (!nextUser.bot) {
            try {
              const dm = [];
              dm.push(`Du hast bei Cringer ein Like von ${ownUserProfile.name} erhalten :heart:`);
              dm.push(`Geschlecht: ${ownUserProfile.gender}`);
              dm.push(`Alter: ${ownUserProfile.age}`);
              dm.push(`Job: ${ownUserProfile.job}`);
              dm.push(`Beschreibung: ${ownUserProfile.description}`);
              nextUser.send(dm);
            } catch (error) {
              console.log(error);
            }
          }

          if (await match.isMatch(userId, nextUserId)) {
            response = [];
            response.push(':sparkling_heart: :sparkling_heart: :sparkling_heart:');
            response.push(`${message.author} und ${nextUser} haben ein Match!`);
            response.push(':sparkling_heart: :sparkling_heart: :sparkling_heart:');
            message.channel.send(response);

            try {
              nextUser.send(`Du und ${ownUserProfile.name} habt ein Cringer Match :heart: :heart: :heart:`);
              message.author.send(`Du und ${nextUserProfile.name} habt ein Cringer Match :heart: :heart: :heart:`);
            } catch (error) {
              console.log(`Error sending cringer match DMs: ${error}`);
            }
          }
        } else {
          message.channel.send('Bruder muss los :broken_heart:');
        }
      })
      .catch(() => {
        message.reply('Wie es scheint, kannst du dich wohl nicht entscheiden :thinking: Goldi ist auch noch Single :relaxed:');
      });
  });
};

module.exports = { play };
