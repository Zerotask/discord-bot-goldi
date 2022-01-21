module.exports = {
  name: 'blt',
  aliases: ['bannerlord'],
  description: 'BLT ist eine Modifikation (Twitch-Integration) für das Strategiespiel Mount & Blade 2: Bannerlord',
  execute({ message }) {
    const response = [];
    response.push('BLT ist eine Modifikation (Twitch-Integration) für das Strategiespiel Mount & Blade 2: Bannerlord.');
    response.push('Mit nachfolgendem Link siehst du alle Informationen für den Stream von goldman94:');
    response.push('https://goldman94.neocities.org');
    message.channel.send(response);
  },
};
