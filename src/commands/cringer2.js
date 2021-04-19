const { getRandomNumber } = require('../functions');
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
            const age = args[1];
            setAge(userId, age);
            message.reply(`deiner neues Alter ist: ${age}`);
          } else {
            message.reply(`deiner Alter ist: ${await getAge(userId)}`);
          }
          break;
        case 'job':
        case 'beruf':
          if (args[1]) {
            const job = args[1];
            setJob(userId, job);
            message.reply(`deiner neuer Job ist: ${job}`);
          } else {
            message.reply(`dein Job ist: ${await getJob(userId)}`);
          }
          break;
        case 'gender':
        case 'geschlecht':
          if (args[1]) {
            const gender = args[1];
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
            response.push(`Beschreibung: ${profile.description}`);
            response.push(`Alter: ${profile.age}`);
            response.push(`Job: ${profile.job}`);
            response.push(`Geschlecht: ${profile.gender || '-nicht angegeben-'}`);
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
          message.reply('Noch nicht implementiert.');
          break;
        case 'help':
        default:
          const response = [];
          response.push('Nachfolgende Befehle kannst du mit Cringer nutzen:');
          response.push('**Beschreibung aktualisieren**: `!cringer beschreibung <text>`');
          response.push('**Beschreibung abrufen**: `!cringer beschreibung`');
          response.push('**Alter aktualisieren**: `!cringer alter <alter>`');
          response.push('**Alter abrufen**: `!cringer alter`');
          response.push('**Job aktualisieren**: `!cringer job <job>`');
          response.push('**Job abrufen**: `!cringer job`');
          response.push('**Geschlecht aktualisieren**: `!cringer geschlecht <geschlecht>`');
          response.push('**Geschlecht abrufen**: `!cringer geschlecht`');
          response.push('**Profil abrufen**: `!cringer profil`');
          response.push('**Profil zurücksetzen**: `!cringer profil reset`');
          response.push('**Cringer Game**: `!cringer`');
          message.reply(response);
      }
    } else {
      // play cringer game
    }
  },
};
