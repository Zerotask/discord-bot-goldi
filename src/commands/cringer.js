const { shuffleArray } = require('../functions');
const functions = require('./cringer/functions');
const profile = require('./cringer/profile');
const like = require('./cringer/like');
const match = require('./cringer/match');
const game = require('./cringer/game');
const help = require('./cringer/help');
const premium = require('./cringer/premium');

const version = '0.11.0';

module.exports = {
  name: 'cringer',
  aliases: ['cringe', 'match'],
  description: 'Hast du ein Cringer match?',
  example: 'help',
  async execute(message, args, client) {
    // Get all users
    const userList = client.users.cache;

    // Delete bot and author from the user list.
    userList.delete(client.user.id);
    userList.delete(message.author.id);

    // Convert to array and get a random user
    const userPool = shuffleArray(Array.from(userList.keys()));

    const userId = message.author.id;
    await functions.createUserIfNeeded(userId, message.author.username, userPool);

    let response = [];

    // User set args
    if (args.length) {
      switch (args[0].toLowerCase()) {
        case 'description':
        case 'desc':
        case 'beschreibung':
          if (args[1]) {
            // Remove first element
            const description = args.slice(1).join(' ');
            profile.setDescription(userId, description);
            message.reply(`deine neue Beschreibung ist: ${description}`);
          } else {
            message.reply(`deine Beschreibung ist: ${await profile.getDescription(userId)}`);
          }
          break;
        case 'age':
        case 'alter':
          if (args[1]) {
            const age = Math.min(150, Math.max(0, parseInt(args[1], 10)));
            profile.setAge(userId, age);
            message.reply(`dein neues Alter ist: ${age} Jahre`);
          } else {
            message.reply(`dein Alter ist: ${await profile.getAge(userId)} Jahre`);
          }
          break;
        case 'job':
        case 'beruf':
          if (args[1]) {
            const job = args.slice(1).join(' ');
            profile.setJob(userId, job);
            message.reply(`deiner neuer Job ist: ${job}`);
          } else {
            message.reply(`dein Job ist: ${await profile.getJob(userId)}`);
          }
          break;
        case 'gender':
        case 'geschlecht':
          if (args[1]) {
            const gender = args.slice(1).join(' ');
            profile.setGender(userId, gender);
            message.reply(`dein neues Geschlecht ist: ${gender}`);
          } else {
            message.reply(`dein Geschlecht ist: ${await profile.getGender(userId)}`);
          }
          break;
        case 'profile':
        case 'profil':
        case 'p':
          if (args[1] && (args[1].toLowerCase() === 'reset' || args[1].toLowerCase() === 'zurücksetzen')) {
            profile.resetProfile(userId);
            message.reply('dein Profil wurde zurückgesetzt.');
          } else {
            profile.show(message, userId);
          }
          break;
        case 'users':
        case 'user':
        case 'leute':
        case 'verfügbar':
          message.reply(`Es gibt insgesamt ${message.channel.guild.memberCount} Leute. Du hast noch ${(await functions.getUser(userId)).userPool.length} zum Liken. Danach fängt es wieder von vorne an.`);
          break;
        case 'version':
          message.reply(`Die Cringer-Version ist: ${version}`);
          break;
        case 'reset':
        case 'zurücksetzen':
          functions.reset(userId);
          message.reply('Dein Profil, deine gesendeten Likes und deine Matches wurden zurückgesetzt.');
          break;
        case 'likes':
        case 'received-likes':
        case 'likes-received':
          like.showLikesReceived(message, userId, userList);
          break;
        case 'liked':
        case 'sent-likes':
        case 'likes-sent':
          if (args[1] && (args[1].toLowerCase() === 'reset' || args[1].toLowerCase() === 'zurücksetzen')) {
            like.resetLikesSent(userId);
            message.reply('deine gesendeten Likes wurden zurückgesetzt.');
          } else {
            like.showLikesSent(message, userId, userList);
          }
          break;
        case 'matches':
        case 'match':
          if (args[1] && (args[1].toLowerCase() === 'reset' || args[1].toLowerCase() === 'zurücksetzen')) {
            match.resetMatches(userId);
            message.reply('deine Matches wurden zurückgesetzt.');
          } else {
            const matches = await match.getMatches(userId);
            if (matches.length) {
              response = [];
              response.push(`Das sind deine Matches (${matches.length}):`);
              matches.forEach((matchUserId) => response.push(userList.get(matchUserId).username));
              message.reply(response);
            } else {
              message.reply('Du hast bisher keine Cringer Matches :broken_heart:');
            }
          }
          break;
        case 'premium':
          if (args[1] && (args[1].toLowerCase() === 'buy' || args[1].toLowerCase() === 'kaufen')) {
            message.reply('Du G E R I N G V E R D I E N E R hast leider zu wenig Bitcoins, um dir das zu leisten.');
          } else {
            premium.show(message);
          }
          break;
        case 'off':
        case 'hide':
          profile.setShowUser(userId, false);
          message.reply('Du wirst in der Suche nun nicht mehr angezeigt. :x: Du kannst aber weiterhin cringen.');
          break;
        case 'on':
        case 'show':
          profile.setShowUser(userId, true);
          message.reply('Du wirst in der Suche nun angezeigt. :eyes:');
          break;
        case 'help':
        default:
          help.show(message, this.name);
      }
    } else {
      game.play(message, userId, userPool, userList);
    }
  },
};
