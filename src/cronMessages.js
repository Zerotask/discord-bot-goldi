const cron = require('node-cron');
const date = require('date-and-time');
const config = require('../config.json');
const { getTopClipsOfTheWeek } = require('./twitch');

const postTopClipsOfTheWeek = async (client) => {
  const clipsOfTheWeek = await getTopClipsOfTheWeek();
  if (clipsOfTheWeek.length > 0) {
    const clipsChannel = client.channels.cache.get(config.channels.clips);
    clipsChannel.send('Ich präsentiere euch die Clips der Woche :blush:');
    let place = 1;
    const crownEmoji = '<:Krone_2:829297770354442251>';
    clipsOfTheWeek.forEach((clip) => {
      const response = [];
      const repeatCrowns = Math.ceil(3 / place);
      response.push(`** ${crownEmoji.repeat(repeatCrowns)} Platz ${place}: ${clip.title} ${crownEmoji.repeat(repeatCrowns)}**`);
      response.push(`*Erstellt von: ${clip.creatorDisplayName} | Datum: ${date.format(clip.creationDate, 'DD.MM.YYYY HH:MM')} Uhr | Views: ${clip.views}*`);
      response.push(clip.url);
      clipsChannel.send(response);

      place += 1;
    });
  }
};

const run = (client) => {
  const mainChannel = client.channels.cache.get(config.channels.general);
  // For testing purpose.
  // const botTestingChannel = client.channels.cache.get(config.channels.botTesting);

  const cronOptions = {
    timezone: 'Europe/Berlin',
  };

  // 20:00 on 1st of a month
  cron.schedule('0 20 1 * *', () => {
    const info = [];
    info.push('Ich hoffe, dass ihr alle eine tollen Tag hattet! :blush:');
    info.push('Mit den Befehlen `!commands` oder `!help` erfährst du, wie du mit mir interagieren kannst.');
    // info.push(`Möchtet ihr wissen, an welchen Tagen und welches Spiel gestreamt wird? Dann klickt einfach hier: <#${config.channels.streamWeekPlan}>`);
    info.push(`Die Regeln findet ihr hier: <#${config.channels.rules}>. Falls jemand dagegen verstößt oder belästigt wird, dann kann man mit \`!report\` denjenigen melden, z. B. \`!report @Goldi hat mir unanständige Nachrichten geschickt\``);
    info.push(`Seid ihr eher so der cringe Typ? Dann kommt doch in den Kanal <#${config.channels.cringer}>. Für weitere Information schreibt \`!cringer help\``);
    info.push(`Im Kanal <#${config.channels.clips}> findet ihr lustige Clips von <@${config.admin}> und Co. Außerdem könnt ihr dort auch selbst Clips posten. Den Link zu den Twitch-Clips von <@${config.admin}> erhaltet ihr mit dem \`!clips\``);
    mainChannel.send(info);
  }, cronOptions);

  // Sunday 22:00
  cron.schedule('0 22 * * 7', () => {
    postTopClipsOfTheWeek(client);
  }, cronOptions);

  // 11. September (Birthday)
  cron.schedule('0 0 11 9 *', () => {
    const currentYear = new Date().getFullYear();
    const age = currentYear - 1994;
    mainChannel.send(`Ich wünsche <@${config.admin}> alles Liebe und viel Gesundheit zu seinem ${age}. Geburtstag :partying_face: :partying_face: :partying_face:`);
  }, cronOptions);
};

module.exports = { run };
