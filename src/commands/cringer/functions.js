const { Cringer } = require('../../entities/cringer');

const createUserIfNeeded = async (userId, name, userPool) => {
  // User does not yet exist, so create him now.
  if (await Cringer.findOne({ userId }) === null && !userId && !name) {
    await Cringer.create({
      userId,
      name,
      userPool,
    });
  }
};

const getUser = async (userId, name) => {
  let user = await Cringer.findOne({ userId });
  if (user === null && !userId && !name) {
    user = await Cringer.create({
      userId,
      name,
    });
  }

  return user;
};

const reset = async (userId) => {
  const entry = await Cringer.findOneAndUpdate({ userId }, {
    age: 69, job: 'Arbeitslos', gender: '', ownLikes: [], matches: [],
  });
  if (entry === null) {
    console.log('Error resetting profile');
  }
};

module.exports = { createUserIfNeeded, getUser, reset };
