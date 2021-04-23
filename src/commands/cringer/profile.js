const Discord = require('discord.js');
const { getUser } = require('./functions');
const { Cringer } = require('../../entities/cringer');

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

const show = async (message, userId) => {
  const user = await getUser(userId);

  const embedResponse = new Discord.MessageEmbed()
    .setColor('#de2600')
    .setTitle(':sparkling_heart: :sparkling_heart: Dein Cringer-Profil :sparkling_heart: :sparkling_heart:')
    .setThumbnail(message.author.avatarURL())
    .addFields(
      { name: 'Name', value: user.name, inline: true },
      { name: 'Geschlecht', value: user.gender, inline: true },
      { name: 'Alter', value: user.age, inline: true },
      { name: 'Job', value: user.job },
      { name: 'Beschreibung', value: user.description },
      { name: '\u200B', value: '\u200B' }, // blank line
    );

  if (user.show) {
    embedResponse.addField('*Du wirst in der Suche angezeigt* :eyes:', '*Mit `!cringer hide` kannst du einstellen, dass du nicht mehr in der Suche angezeigt wirst.*');
  } else {
    embedResponse.addField('*Du wirst in der Suche nicht angezeigt* :x:', '*Mit `!cringer show` kannst du einstellen, dass du wieder in der Suche angezeigt wirst.*');
  }

  message.channel.send(embedResponse);
};

const setShowUser = async (userId, flag) => {
  const entry = await Cringer.findOneAndUpdate({ userId }, { show: flag });
  if (entry === null) {
    console.log('Error setting show');
  }
};

module.exports = {
  setDescription,
  getDescription,
  setAge,
  getAge,
  setJob,
  getJob,
  setGender,
  getGender,
  resetProfile,
  show,
  setShowUser,
};
