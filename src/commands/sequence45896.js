const { getRandomNumber } = require('../functions');

module.exports = {
  name: 'sequence45896',
  aliases: ['sequenz45896', 'protokoll45896', 'code45896'],
  description: 'Nichts für Unbefugte!',
  execute({ message }) {
    message.channel.send('`Starte Sequenz 45896`');
    message.channel.send('Bestätige Sequenz mit dem geheimen Passwort :spy: Du hast 30 Sekunden Zeit!');

    const filter = (m) => message.author.id === m.author.id;
    message.channel.awaitMessages(filter, { time: 30000, max: 1, errors: ['time'] })
      .then(async (messages) => {
        const code = messages.first().content.toLowerCase().trim();
        if (parseInt(code, 10) === 1234) {
          message.channel.send('Das geheime Passwort ist korrekt. :unlock:');

          setTimeout(() => {
            message.channel.send('Beginne mit der Ausführung der `Sequenz 45896` :pager:');
            setTimeout(() => {
              message.channel.send('Angriffsmodus starten...').then((sent1) => {
                setTimeout(() => {
                  sent1.edit('*Code: 0xAF3* - Interne Application Firewalls aktiviert. :fire:').then((sent2) => {
                    setTimeout(() => {
                      sent2.edit('*Code: 0xAB2* - Kyptografische Angriffsmuster erstellt. :control_knobs:').then((sent3) => {
                        setTimeout(() => {
                          sent3.edit('*Code: 0xAE8* - Goldi-Bot-Net gestartet. :cloud_tornado:').then((sent4) => {
                            setTimeout(() => {
                              sent4.edit('*Code: 0xDD6* - Uploading Goldimalware :satellite_orbital:').then((sent5) => {
                                setTimeout(() => {
                                  sent5.edit('*Code: 0xDC1* - Übernehme den Discord-Server <:atk:813385698945925150>').then((sent6) => {
                                    setTimeout(() => {
                                      sent6.edit('Ich bin **GOLDI** - muss... dagegen.. ankämpfen :women_wrestling:').then((sent7) => {
                                        setTimeout(() => {
                                          sent7.edit('Oh nein, oh nein. Was habe ich getan? :flushed:').then((sent8) => {
                                            setTimeout(() => {
                                              sent8.edit('Starte Goldi Recovery Modus. Bitte warten... :tools:').then((sent9) => {
                                                setTimeout(() => {
                                                  sent9.edit('Hallo :blush: wie kann ich dir helfen?');
                                                }, 6500);
                                              });
                                            }, 6500);
                                          });
                                        }, 5500);
                                      });
                                    }, 6500);
                                  });
                                }, 6000);
                              });
                            }, 6500);
                          });
                        }, 5500);
                      });
                    }, 5000);
                  });
                }, 4500);
              });
            }, 4000);
          }, 3000);
        } else {
          message.channel.send('Passwort inkorrekt. Fehlerhafte Eingabe wurde geloggt. :rotating_light:');
          setTimeout(() => {
            message.channel.send('Starte Hackangriff. Bitte warten...');
            setTimeout(() => {
              const hackedPassword = `baby${message.author.username.split('').reverse().join('')}${getRandomNumber(0, 999)}`;
              message.channel.send(`Hackangriff erfolgreich. Das Passwort von ${message.author.username} ist *${hackedPassword}*. Ein neues 256bit starkes Passwort wurde gesetzt.`);
              setTimeout(() => {
                message.channel.send('Der Account wurde erfolgreich übernommen. Du wirst in 30 Sekunden automatisch ausgeloggt.');
              }, 5500);
            }, 5000);
          }, 1500);
        }
      })
      .catch(() => {
        message.reply('Sequenz 45896 wurde abgebrochen. Kehre in den normalen Modus zurück.');
      });
  },
};
