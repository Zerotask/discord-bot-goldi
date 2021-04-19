const config = require('../../config.json');
const { Cringer } = require('../entities/cringer');

const version = 0.2;

const createUserIfNeeded = async (userId) => {
  // User does not yet exist, so create him now.
  if (await Cringer.findOne({ where: { userId } }) === null) {
    await Cringer.create({
      userId,
    });
  }
};

const getUser = async (userId) => Cringer.findOne({ where: { userId } });

const setDescription = async (userId, description) => {
  const affectedRows = await Cringer.update({ description }, { where: { userId } });
  if (affectedRows !== 1) {
    console.log(`Error setting age. Affected rows: ${affectedRows}`);
  }
};

const getDescription = async (userId) => {
  const user = await getUser(userId);
  return user.age;
};

const setAge = async (userId, age) => {
  const affectedRows = await Cringer.update({ age }, { where: { userId } });
  if (affectedRows !== 1) {
    console.log(`Error setting age. Affected rows: ${affectedRows}`);
  }
};

const getAge = async (userId) => {
  const user = await getUser(userId);
  return user.age;
};

const setJob = async (userId, job) => {
  const affectedRows = await Cringer.update({ job }, { where: { userId } });
  if (affectedRows !== 1) {
    console.log(`Error setting job. Affected rows: ${affectedRows}`);
  }
};

const getJob = async (userId) => {
  const user = await getUser(userId);
  return user.job;
};

const setGender = async (userId, gender) => {
  const affectedRows = await Cringer.update({ gender }, { where: { userId } });
  if (affectedRows !== 1) {
    console.log(`Error setting gender. Affected rows: ${affectedRows}`);
  }
};

const getGender = async (userId) => {
  const user = await getUser(userId);
  return user.gender;
};

const resetProfile = async (userId) => {
  const affectedRows = await Cringer.update({ age: 69, job: 'Arbeitslos', gender: '' }, { where: { userId } });
  if (affectedRows !== 1) {
    console.log(`Error setting profile. Affected rows: ${affectedRows}`);
  }
};

const resetMatches = async (userId) => {
  const affectedRows = await Cringer.update({ matches: [] }, { where: { userId } });
  if (affectedRows !== 1) {
    console.log(`Error setting matches. Affected rows: ${affectedRows}`);
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

  const affectedRows = await Cringer.update({ ownLikes }, { where: { userId } });
  if (affectedRows !== 1) {
    console.log(`Error setting matches. Affected rows: ${affectedRows}`);
  }
};

const resetOwnLikes = async (userId) => {
  const affectedRows = await Cringer.update({ ownLikes: [] }, { where: { userId } });
  if (affectedRows !== 1) {
    console.log(`Error setting matches. Affected rows: ${affectedRows}`);
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
  const affectedRows = await Cringer.update({
    age: 69, job: 'Arbeitslos', gender: '', ownLikes: [], matches: [],
  }, { where: { userId } });
  if (affectedRows !== 1) {
    console.log(`Error setting profile. Affected rows: ${affectedRows}`);
  }
};

module.exports = {
  name: 'cringer2',
  aliases: ['cringe2', 'match2'],
  description: 'Hast du ein Cringer match?',
  example: 'help',
  async execute(message, args) {
    const userId = message.author.id;
    createUserIfNeeded(userId);

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
          message.reply(`Es gibt insgesamt ${message.channel.guild.memberCount}`);
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
          if (foreignLikes) {
            const response = [];
            response.push('Deine eigenen Likes:');
            for (const foreignLike in foreignLikes) {
              response.push(foreignLike);
            }
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
            if (ownLikes) {
              const response = [];
              response.push('Deine eigenen Likes:');
              for (const ownLike in ownLikes) {
                response.push(ownLike);
              }
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
            if (matches) {
              const response = [];
              response.push('Deine Matches:');
              for (const match in matches) {
                response.push(match);
              }
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
          response.push(`** Alter aktualisieren **: \`${config.commandPrefix}${this.name} alter <alter>\``);
          response.push(`**Alter abrufen**: \`${config.commandPrefix}${this.name} alter\``);
          response.push(`** Job aktualisieren **: \`${config.commandPrefix}${this.name} job <job>\``);
          response.push(`**Job abrufen**: \`${config.commandPrefix}${this.name} job\``);
          response.push(`** Geschlecht aktualisieren **: \`${config.commandPrefix}${this.name} geschlecht <geschlecht>\``);
          response.push(`**Geschlecht abrufen**: \`${config.commandPrefix}${this.name} geschlecht\``);
          response.push(`** Profil abrufen **: \`${config.commandPrefix}${this.name} profil\``);
          response.push(`**Profil zurücksetzen**: \`${config.commandPrefix}${this.name} profil reset\``);
          response.push(`** Cringer Game **: \`${config.commandPrefix}${this.name}\``);
          message.reply(response);
      }
    } else {
      // play cringer game
      message.reply('Noch nicht implementiert.');
    }
  },
};
