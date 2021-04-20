const { getUser } = require('./functions');
const { Cringer } = require('../../entities/cringer');

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

const isMatch = async (userId1, userId2) => {
  const user1 = await getUser(userId1);
  const user2 = await getUser(userId2);

  if (user1.likes.sent.includes(userId2) && user2.likes.sent.includes(userId1)) {
    // Update matches for User 1
    user1.matches.push(userId2);
    await Cringer.findOneAndUpdate({ userId: userId1 }, { matches: user1.matches });

    // Update matches for User 2
    user2.matches.push(userId1);
    await Cringer.findOneAndUpdate({ userId: userId2 }, { matches: user2.matches });

    return true;
  }
  return false;
};

module.exports = { resetMatches, getMatches, isMatch };
