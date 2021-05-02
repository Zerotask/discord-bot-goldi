const cron = require('node-cron');
const config = require('../config.json');

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

  // Sunday 19:00
  cron.schedule('0 19 * * 7', () => {
    const info = [];
    info.push('Ich hoffe, dass ihr alle eine tolle Woche hattet! :blush:');
    info.push('Mit den Befehlen `!commands` oder `!help` erfährst du, wie du mit mir interagieren kannst.');
    info.push(`Möchtest du wissen, an welchen Tagen und welches Spiel gestreamt wird? Dann klick einfach hier: <#${config.channels.streamWeekPlan}>`);
    info.push(`Die Regeln findest du hier: <#${config.channels.rules}>. Falls jemand dagegen verstößt oder dich belästigt, kannst du mit \`!report\` denjenigen melden, z. B. \`!report @Goldi hat mir unanständige Nachrichten geschickt\``);
    info.push(`Du bist eher der cringe Typ? Dann komm doch in den Channel <#${config.channels.cringer}>. Für weitere Information schreibe \`!cringer help\``);
    info.push(`Die Highlights der vergangenen Streams kannst du dir im Channel <#${config.channels.clips}> anschauen. Weitere Clips findest du mit dem Befehl \`!clips\``);
    mainChannel.send(info);
  }, cronOptions);
};

module.exports = { run };
