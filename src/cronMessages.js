const cron = require('node-cron');
const date = require('date-and-time');
const config = require('../config.json');
const { getTopClipsOfTheWeek } = require('./twitch');

const postTopClipsOfTheWeek = async (client) => {
  const clipsChannel = client.channels.cache.get(config.channels.clips);
  clipsChannel.send('Ich präsentiere euch die Clips der Woche :blush:');
  let place = 1;
  const crownEmoji = '<:Krone_2:829297770354442251>';
  (await getTopClipsOfTheWeek()).forEach((clip) => {
    const response = [];
    const repeatCrowns = Math.ceil(3 / place);
    response.push(`** ${crownEmoji.repeat(repeatCrowns)} Platz ${place}: ${clip.title} ${crownEmoji.repeat(repeatCrowns)}**`);
    response.push(`*Erstellt von: ${clip.creatorDisplayName} | Datum: ${date.format(clip.creationDate, 'DD.MM.YYYY HH:MM')} Uhr | Views: ${clip.views}*`);
    response.push(clip.url);
    clipsChannel.send(response);

    place += 1;
  });
};

const run = (client) => {
  const mainChannel = client.channels.cache.get(config.channels.general);
  // For testing purpose.
  // const botTestingChannel = client.channels.cache.get(config.channels.botTesting);

  const cronOptions = {
    timezone: 'Europe/Berlin',
  };

  // Monday 10:00
  cron.schedule('0 10 * * 1', () => {
    mainChannel.send('Ich wünsche euch allen einen guten Start in die Woche :blush: Bleibt alle gesund!');
  }, cronOptions);

  // Friday 18:00
  cron.schedule('0 18 * * 5', () => {
    mainChannel.send('Ich wünsche euch allen ein schönes Wochenende :partying_face:');
  }, cronOptions);

  // 20:00 on 1st of a month
  cron.schedule('0 20 1 * *', () => {
    const info = [];
    info.push('Ich hoffe, dass ihr alle eine tollen Tag hattet! :blush:');
    info.push('Mit den Befehlen `!commands` oder `!help` erfährst du, wie du mit mir interagieren kannst.');
    info.push(`Möchtest du wissen, an welchen Tagen und welches Spiel gestreamt wird? Dann klick einfach hier: <#${config.channels.streamWeekPlan}>`);
    info.push(`Die Regeln findest du hier: <#${config.channels.rules}>. Falls jemand dagegen verstößt oder dich belästigt, kannst du mit \`!report\` denjenigen melden, z. B. \`!report @Goldi hat mir unanständige Nachrichten geschickt\``);
    info.push(`Du bist eher der cringe Typ? Dann komm doch in den Channel <#${config.channels.cringer}>. Für weitere Information schreibe \`!cringer help\``);
    info.push(`Die Highlights der vergangenen Streams kannst du dir im Channel <#${config.channels.clips}> anschauen. Weitere Clips findest du mit dem Befehl \`!clips\``);
    mainChannel.send(info);
  }, cronOptions);

  // Sunday 22:00
  cron.schedule('0 22 * * 7', () => {
    postTopClipsOfTheWeek(client);
  }, cronOptions);
};

module.exports = { run };
