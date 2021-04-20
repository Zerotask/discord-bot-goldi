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
  const response = [];
  response.push('dein Cringer-Profil:');
  response.push(`Name: ${user.name}`);
  response.push(`Geschlecht: ${user.gender || '-nicht angegeben-'}`);
  response.push(`Alter: ${user.age}`);
  response.push(`Job: ${user.job}`);
  response.push(`Beschreibung: ${user.description}`);
  response.push(message.author.avatarURL());
  message.reply(response);
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
};
