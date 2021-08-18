const { Cringer } = require('../../entities/cringer');

const createUserIfNeeded = async (userId, name, userPool) => {
  const user = await Cringer.findOne({ userId });

  // User does not yet exist, so create him now.
  if (user === null && userId && name) {
    try {
      await Cringer.create({
        userId,
        name,
        userPool,
      });
    } catch (error) {
      console.log({
        userId, name, userPool, user,
      });
      console.error(`Cannot create new user. Error: ${error}`);
    }
  }
};

const getUser = async (userId, name) => {
  let user = await Cringer.findOne({ userId });

  if (user === null && userId && name) {
    user = await Cringer.create({
      userId,
      name,
    });
  }

  return user;
};

const reset = async (userId) => {
  const entry = await Cringer.findOneAndUpdate({ userId }, {
    age: 69, job: 'Arbeitslos', gender: '', 'sent.likes': [], matches: [],
  });
  if (entry === null) {
    console.log('Error resetting profile');
  }
};

module.exports = { createUserIfNeeded, getUser, reset };
