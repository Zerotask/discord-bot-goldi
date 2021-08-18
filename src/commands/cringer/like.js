const { getUser } = require('./functions');
const { Cringer } = require('../../entities/cringer');

const addLikeSent = async (userId, userName, otherUserId) => {
  const user = await getUser(userId, userName);
  const sentLikes = user.likes.sent;
  if (!sentLikes.includes(otherUserId)) {
    sentLikes.push(otherUserId);
  }

  const entry = await Cringer.findOneAndUpdate({ userId }, { 'likes.sent': sentLikes });
  if (entry === null) {
    console.log('Error adding sent like');
  }
};

const addLikeReceived = async (userId, otherUserId, otherName) => {
  const user = await getUser(otherUserId, otherName);
  const receivedLikes = user.likes.received;
  if (!receivedLikes.includes(userId)) {
    receivedLikes.push(userId);
  }

  const entry = await Cringer.findOneAndUpdate(
    { userId: otherUserId },
    { 'likes.received': receivedLikes },
  );
  if (entry === null) {
    console.log('Error adding received like to foreign user');
  }
};

const resetLikesSent = async (userId) => {
  const entry = await Cringer.findOneAndUpdate({ userId }, { 'likes.sent': [] });
  if (entry === null) {
    console.log('Error resetting sent likes');
  }
};

const getLikesSent = async (userId, userName) => {
  const user = await getUser(userId, userName);
  return user.likes.sent;
};

const getLikesReceived = async (userId, userName) => {
  const user = await getUser(userId, userName);
  return user.likes.received;
};

const showLikesSent = async (message, userId, userName, userList) => {
  const sentLikes = await getLikesSent(userId, userName);
  if (sentLikes.length) {
    const response = [];
    response.push(`Das sind deine gesendeten Likes (${sentLikes.length}):`);
    sentLikes.forEach((likeUserId) => response.push(userList.get(likeUserId).username));
    message.reply(response);
  } else {
    message.reply('Du hast bisher keiner Person ein Like geschickt :broken_heart:');
  }
};

const showLikesReceived = async (message, userId, userName, userList) => {
  const receivedLikes = await getLikesReceived(userId, userName);
  if (receivedLikes.length) {
    const response = [];
    response.push(`Das sind deine erhaltenen Likes (${receivedLikes.length}):`);
    receivedLikes.forEach((likeUserId) => response.push(userList.get(likeUserId).username));
    message.reply(response);
  } else {
    message.reply('Du hast bisher keine Likes erhalten :broken_heart:');
  }
};

module.exports = {
  addLikeSent,
  addLikeReceived,
  resetLikesSent,
  getLikesSent,
  getLikesReceived,
  showLikesSent,
  showLikesReceived,
};
