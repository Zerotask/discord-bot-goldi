const config = require('../../config.json');
const { Cringer } = require('../entities/cringer');
const { shuffleArray } = require('../functions');

const version = '0.9.2';

const createUserIfNeeded = async (userId, name, userPool) => {
  // User does not yet exist, so create him now.
  if (await Cringer.findOne({ userId }) === null) {
    await Cringer.create({
      userId,
      name,
      userPool,
    });
  }
};

const getUser = async (userId, name) => {
  let user = await Cringer.findOne({ userId });
  if (user === null) {
    user = await Cringer.create({
      userId,
      name,
    });
  }

  return user;
};

const setDescription = async (userId, description) => {
  const entry = await Cringer.findOneAndUpdate({ userId }, { description });
  if (entry === null) {
    console.log('Error setting description');
  }
};

const getDescription = async (userId) => {
  const user = await getUser(userId);
  return user.description;
};

const setAge = async (userId, age) => {
  const entry = await Cringer.findOneAndUpdate({ userId }, { age });
  if (entry === null) {
    console.log('Error setting age');
  }
};

const getAge = async (userId) => {
  const user = await getUser(userId);
  return user.age;
};

const setJob = async (userId, job) => {
  const entry = await Cringer.findOneAndUpdate({ userId }, { job });
  if (entry === null) {
    console.log('Error setting job');
  }
};

const getJob = async (userId) => {
  const user = await getUser(userId);
  return user.job;
};

const setGender = async (userId, gender) => {
  const entry = await Cringer.findOneAndUpdate({ userId }, { gender });
  if (entry === null) {
    console.log('Error setting gender');
  }
};

const getGender = async (userId) => {
  const user = await getUser(userId);
  return user.gender;
};

const resetProfile = async (userId) => {
  const entry = await Cringer.findOneAndUpdate({ userId }, { age: 69, job: 'Arbeitslos', gender: '' });
  if (entry === null) {
    console.log('Error resetting profile');
  }
};

const resetMatches = async (userId) => {
  const entry = await Cringer.findOneAndUpdate({ userId }, { matches: [] });
  if (entry === null) {
    console.log('Error resetting matches');
  }
};

const getMatches = async (userId) => {
  const user = await getUser(userId);
  return user.matches;
};

const addOwnLike = async (userId, otherUserId) => {
  const user = await getUser(userId);
  const { ownLikes } = user;
  if (!ownLikes.includes(otherUserId)) {
    ownLikes.push(otherUserId);
  }

  const entry = await Cringer.findOneAndUpdate({ userId }, { ownLikes });
  if (entry === null) {
    console.log('Error adding own like');
  }
};

const addLikeToForeign = async (userId, otherUserId, otherName) => {
  const user = await getUser(otherUserId, otherName);
  const { foreignLikes } = user;
  if (!foreignLikes.includes(userId)) {
    foreignLikes.push(userId);
  }

  const entry = await Cringer.findOneAndUpdate({ userId: otherUserId }, { foreignLikes });
  if (entry === null) {
    console.log('Error adding foreignLike to foreign user');
  }
};

const resetOwnLikes = async (userId) => {
  const entry = await Cringer.findOneAndUpdate({ userId }, { ownLikes: [] });
  if (entry === null) {
    console.log('Error resetting own likes');
  }
};

const getOwnLikes = async (userId) => {
  const user = await getUser(userId);
  return user.ownLikes;
};

const getForeignLikes = async (userId) => {
  const user = await getUser(userId);
  return user.foreignLikes;
};

const reset = async (userId) => {
  const entry = await Cringer.findOneAndUpdate({ userId }, {
    age: 69, job: 'Arbeitslos', gender: '', ownLikes: [], matches: [],
  });
  if (entry === null) {
    console.log('Error resetting profile');
  }
};

const getNextUserForCringeGame = async (userId, userPool) => {
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

const isMatch = async (userId1, userId2) => {
  const user1 = await getUser(userId1);
  const user2 = await getUser(userId2);

  if (user1.ownLikes.includes(userId2) && user2.ownLikes.includes(userId1)) {
    // Update matche for User 1
    user1.matches.push(userId2);
    await Cringer.findOneAndUpdate({ userId1 }, { matches: user1.matches });

    // Update matche for User 2
    user2.matches.push(userId1);
    await Cringer.findOneAndUpdate({ userId2 }, { matches: user2.matches });

    return true;
  }
  return false;
};

module.exports = {
  name: 'cringer',
  aliases: ['cringe', 'match'],
  description: 'Hast du ein Cringer match?',
  example: 'help',
  async execute(message, args, client) {
    // Get all users
    const userList = client.users.cache;

    // Delete bot and author from the user list.
    userList.delete(client.user.id);
    userList.delete(message.author.id);

    // Convert to array and get a random user
    const userPool = shuffleArray(Array.from(userList.keys()));

    const userId = message.author.id;
    await createUserIfNeeded(userId, message.author.username, userPool);

    // User set args
    if (args.length) {
      switch (args[0].toLowerCase()) {
        case 'description':
        case 'desc':
        case 'beschreibung':
          if (args[1]) {
            // Remove first element
            const description = args.slice(1).join(' ');
            setDescription(userId, description);
            message.reply(`deine neue Beschreibung ist: ${description}`);
          } else {
            message.reply(`deine Beschreibung ist: ${await getDescription(userId)}`);
          }
          break;
        case 'age':
        case 'alter':
          if (args[1]) {
            const age = args.slice(1).join(' ');
            setAge(userId, age);
            message.reply(`deiner neues Alter ist: ${age}`);
          } else {
            message.reply(`deiner Alter ist: ${await getAge(userId)}`);
          }
          break;
        case 'job':
        case 'beruf':
          if (args[1]) {
            const job = args.slice(1).join(' ');
            setJob(userId, job);
            message.reply(`deiner neuer Job ist: ${job}`);
          } else {
            message.reply(`dein Job ist: ${await getJob(userId)}`);
          }
          break;
        case 'gender':
        case 'geschlecht':
          if (args[1]) {
            const gender = args.slice(1).join(' ');
            setGender(userId, gender);
            message.reply(`dein neues Geschlecht ist: ${gender}`);
          } else {
            message.reply(`dein Geschlecht ist: ${await getGender(userId)}`);
          }
          break;
        case 'profile':
        case 'profil':
          if (args[1] && (args[1].toLowerCase() === 'reset' || args[1].toLowerCase() === 'zurücksetzen')) {
            resetProfile(userId);
            message.reply('dein Profil wurde zurückgesetzt.');
          } else {
            const profile = await getUser(userId);
            const response = [];
            response.push('dein Cringer-Profil:');
            response.push(`Name: ${message.author.username}`);
            response.push(`Geschlecht: ${profile.gender || '-nicht angegeben-'}`);
            response.push(`Alter: ${profile.age}`);
            response.push(`Job: ${profile.job}`);
            response.push(`Beschreibung: ${profile.description}`);
            response.push(message.author.avatarURL());
            message.reply(response);
          }
          break;
        case 'users':
        case 'user':
        case 'leute':
        case 'verfügbar':
          const user = await getUser(userId);
          message.reply(`Es gibt insgesamt ${message.channel.guild.memberCount} Leute. Du hast noch ${user.userPool.length} zum liken. Danach fängt es wieder von vorne an.`);
          break;
        case 'version':
          message.reply(`Die Cringer-Version ist: ${version}`);
          break;
        case 'reset':
        case 'zurücksetzen':
          reset(userId);
          message.reply('Dein Profil, deine eigenen Likes und deine Matches wurden zurückgesetzt.');
          break;
        case 'likes':
        case 'foreign-likes':
          const foreignLikes = await getForeignLikes(userId);
          if (foreignLikes.length) {
            console.log(foreignLikes);
            const response = [];
            response.push(`Das sind deine erhaltenen Likes (${foreignLikes.length}):`);
            foreignLikes.forEach((likeUserId) => response.push(userList.get(likeUserId).username));
            message.reply(response);
          } else {
            message.reply('Du hast bisher keine Likes erhalten :broken_heart:');
          }
          break;
        case 'liked':
        case 'own-likes':
          if (args[1] && (args[1].toLowerCase() === 'reset' || args[1].toLowerCase() === 'zurücksetzen')) {
            resetOwnLikes(userId);
            message.reply('deine eigenen Likes wurden zurückgesetzt.');
          } else {
            const ownLikes = await getOwnLikes(userId);
            if (ownLikes.length) {
              const response = [];
              response.push(`Das sind deine gesendeten Likes (${ownLikes.length}):`);
              ownLikes.forEach((likeUserId) => response.push(userList.get(likeUserId).username));
              message.reply(response);
            } else {
              message.reply('Du hast bisher keine Person geliked :broken_heart:');
            }
          }
          break;
        case 'matches':
          if (args[1] && (args[1].toLowerCase() === 'reset' || args[1].toLowerCase() === 'zurücksetzen')) {
            resetMatches(userId);
            message.reply('deine Matches wurde zurückgesetzt.');
          } else {
            const matches = await getMatches(userId);
            if (matches.length) {
              const response = [];
              response.push(`Das sind deine Matches (${matches.length}):`);
              matches.forEach((matchUserId) => response.push(userList.get(matchUserId).username));
              message.reply(response);
            } else {
              message.reply('Du hast bisher keine Cringer Matches :broken_heart:');
            }
          }
          break;
        case 'help':
        default:
          const response = [];
          response.push('Nachfolgende Befehle kannst du mit Cringer nutzen:');
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
          response.push(`**Cringer Game **: \`${config.commandPrefix}${this.name}\``);
          message.reply(response);
      }
    } else {
      // play cringer game
      const nextUserId = await getNextUserForCringeGame(userId, userPool);
      const nextUser = userList.get(nextUserId);
      console.log({ nextUser });
      const nextUserProfile = await getUser(nextUserId, nextUser.username);

      const response = [];
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
              addLikeToForeign(userId, nextUserId, nextUser.username);
              addOwnLike(userId, nextUserId);
              // Send to channel
              message.reply(`Du hast ${nextUser.username} ein Like geschickt :heart:`);

              // send DM to the liked user
              if (!nextUser.bot) {
                try {
                  nextUser.send(`Du hast bei Cringer ein Like von ${message.author.username} erhalten :heart:`);
                } catch (error) {
                  console.log(error);
                }
              }

              if (await isMatch(userId, nextUserId)) {
                message.channel.send(`:sparkling_heart: :sparkling_heart: :sparkling_heart: ${message.author} und ${nextUser} haben ein Match! :sparkling_heart: :sparkling_heart: :sparkling_heart:`);
              }
            } else {
              message.channel.send('Bruder muss los :broken_heart:');
            }
          })
          .catch(() => {
            message.reply('Wie es scheint, kannst du dich wohl nicht entscheiden :thinking: Goldi ist auch noch Single :relaxed:');
          });
      });
    }
  },
};
