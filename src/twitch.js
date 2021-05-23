const { ApiClient } = require('twitch');
const { RefreshableAuthProvider, StaticAuthProvider } = require('twitch-auth');
const config = require('../config.json');
const { getDateDaysBack } = require('./functions');

const getApiClient = () => {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const clientSecret = process.env.TWITCH_CLIENT_SECRET;
  const accessToken = process.env.TWITCH_ACCESS_TOKEN;
  const refreshToken = process.env.TWITCH_REFRESH_TOKEN;
  const authProvider = new RefreshableAuthProvider(
    new StaticAuthProvider(clientId, accessToken),
    {
      clientSecret,
      refreshToken,
      onRefresh: (token) => {
        process.env.TWITCH_ACCESS_TOKEN = token;
      },
    },
  );

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

const getFollowersCount = async () => {
  const follows = getApiClient().helix.users.getFollows({ followedUser: config.twitchChannelId });
  return (await follows).total;
};

module.exports = {
  getApiClient,
  getUser,
  getStreamer,
  getTopClipsOfTheWeek,
  getFollowersCount,
};
