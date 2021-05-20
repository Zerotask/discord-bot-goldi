const { ApiClient } = require('twitch');
const { ClientCredentialsAuthProvider } = require('twitch-auth');
const config = require('../config.json');
const { getDateDaysBack } = require('./functions');

const getApiClient = () => {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;
  const authProvider = new ClientCredentialsAuthProvider(clientId, clientSecret);

  return new ApiClient({ authProvider });
};

const getUser = (userName) => getApiClient().helix.users.getUserByName(userName);

const getStreamer = () => getUser(config.twitchChannel);

const getTopClipsOfTheWeek = async (count) => {
  const clipsResponse = await getApiClient().helix.clips.getClipsForBroadcaster(
    config.twitchChannelId,
    { startDate: getDateDaysBack(7), endDate: new Date(), limit: count || 3 },
  );

  return clipsResponse.data;
};

module.exports = {
  getApiClient, getUser, getStreamer, getTopClipsOfTheWeek,
};
