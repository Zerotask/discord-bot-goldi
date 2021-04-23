const { getUser } = require('./functions');
const like = require('./like');
const match = require('./match');
const { Cringer } = require('../../entities/cringer');

const refreshUserPool = async (userId, userPool, userList) => {
  const user = await getUser(userId);

  // Reload user list
  let nextUserId = userPool.pop();

  // next user is already liked
  // next user has set show=false
  while (user.likes.sent.includes(nextUserId)
  || !(await getUser(nextUserId, userList.get(nextUserId).username)).show) {
    if (userPool.length) {
      nextUserId = userPool.pop();
    } else {
      nextUserId = null;
    }
  }

  // No user available
  if (!userPool.length && nextUserId === null) {
    return null;
  }

  await Cringer.findOneAndUpdate({ userId }, {
    userPool,
  });

  return nextUserId;
};

const getNextUser = async (userId, userPool, userList) => {
  const user = await getUser(userId);
  let nextUserId;

  // userPool is empty. Refresh it.
  if (!user.userPool.length) {
    return refreshUserPool(userId, userPool, userList);
  }

  // Get last user from pool.
  nextUserId = user.userPool.pop();

  // next user is already liked
  // next user has set show=false
  while (user.likes.sent.includes(nextUserId)
  || !(await getUser(nextUserId, userList.get(nextUserId).username)).show) {
    if (user.userPool.length) {
      nextUserId = user.userPool.pop();
    } else {
      nextUserId = null;
    }
  }

  // No user available
  if (!user.userPool.length && nextUserId === null) {
    return refreshUserPool(userId, userPool);
  }

  // Update userPool
  await Cringer.findOneAndUpdate({ userId }, {
    userPool: user.userPool,
  });

  return nextUserId;
};

const play = async (message, userId, userPool, userList) => {
  const nextUserId = await getNextUser(userId, userPool, userList);
  if (nextUserId === null) {
    message.reply('Sorry, aber du hast bereits alle User in diesem Discord-Server geliked LUL');
    return;
  }

  const nextUser = userList.get(nextUserId);
  console.log({ nextUserId, nextUser });
  const nextUserProfile = await getUser(nextUserId, nextUser.username);
  const ownUserProfile = await getUser(userId);

  let response = [];
  response.push(message.author);
  response.push(':sparkling_heart: :sparkling_heart: Cringer - finde auch du deine große Liebe :sparkling_heart: :sparkling_heart:');
  response.push('');
  response.push(`Name: ${nextUser.username}`);
  if (nextUserProfile !== null) {
    response.push(`Geschlecht:   ${nextUserProfile.gender}`);
    response.push(`Alter:        ${nextUserProfile.age}`);
    response.push(`Job:          ${nextUserProfile.job}`);
    response.push(`Beschreibung: ${nextUserProfile.description}`);
  }

  response.push(nextUser.avatarURL());
  response.push(':arrow_right: Schreibe: **Ja** oder **Nein**');

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

          if (await match.isMatch(userId, nextUserId)) {
            response = [];
            response.push(':sparkling_heart: :sparkling_heart: :sparkling_heart:');
            response.push(`${message.author} und ${nextUser} haben ein Match!`);
            response.push(':sparkling_heart: :sparkling_heart: :sparkling_heart:');
            response.push(message.author.avatarURL());
            message.channel.send(response);

            try {
              // Send a DM to both, if they have a match.
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
