const { getUser } = require('./functions');
const { Cringer } = require('../../entities/cringer');

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

const showSentLikes = async (message, userId, userList) => {
  const ownLikes = await getOwnLikes(userId);
  if (ownLikes.length) {
    const response = [];
    response.push(`Das sind deine gesendeten Likes (${ownLikes.length}):`);
    ownLikes.forEach((likeUserId) => response.push(userList.get(likeUserId).username));
    message.reply(response);
  } else {
    message.reply('Du hast bisher keine Person geliked :broken_heart:');
  }
};

const showReceivedLikes = async (message, userId, userList) => {
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
};

module.exports = {
  addOwnLike,
  addLikeToForeign,
  resetOwnLikes,
  getOwnLikes,
  getForeignLikes,
  showSentLikes,
  showReceivedLikes,
};
