module.exports = {
  name: 'code45896',
  description: 'Nichts für Unbefugte!',
  execute(message) {
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
              message.channel.send('Angriffsmodus starten...').then((sent) => {
                setTimeout(() => {
                  sent.edit('*Code: 0xAF3* - Interne Application Firewalls aktiviert. :fire:').then((sent2) => {
                    setTimeout(() => {
                      sent2.edit('*Code: 0xAB2* - Kyptografische Angriffsmuster erstellt. :control_knobs:').then((sent3) => {
                        setTimeout(() => {
                          sent3.edit('*Code: 0xAE8* - Goldi-Bot-Net gestartet. :cloud_tornado:').then((sent4) => {
                            setTimeout(() => {
                              setTimeout(() => {
                                sent4.edit('*Code: 0xDC1* - Übernehme den Discord-Server <:atk:813385698945925150>').then((sent5) => {
                                  setTimeout(() => {
                                    sent5.edit('Ich bin **GOLDI** - muss... dagegen.. ankämpfen :women_wrestling:').then((sent6) => {
                                      setTimeout(() => {
                                        sent6.edit('Oh nein, oh nein. Was habe ich getan? :flushed:').then((sent7) => {
                                          setTimeout(() => {
                                            sent7.edit('Starte Goldi Recovery Modus. Bitte warten... :tools:').then((sent8) => {
                                              setTimeout(() => {
                                                sent8.edit('Hallo :blush: wie kann ich dir helfen?');
                                              }, 6000);
                                            });
                                          }, 4500);
                                        });
                                      }, 5500);
                                    });
                                  }, 6000);
                                });
                              }, 5500);
                            }, 6000);
                          });
                        }, 5500);
                      });
                    }, 4500);
                  });
                }, 4000);
              });
            }, 2500);
          }, 3000);
        } else {
          message.channel.send('Passwort inkorrekt. Fehlerhafte Eingabe wurde geloggt. :rotating_light:');
          setTimeout(() => {
            message.channel.send('Starte Hackangriff. Bitte warten...');
            setTimeout(() => {
              message.channel.send(`Hackangriff erfolgreich. Das Passwort **häschen2000** von ${message.author.username} wurde geändert.`);
              setTimeout(() => {
                message.channel.send('Der Account wurde erfolgreich übernommen. Du wirst in 30 Sekunden automatisch ausgeloggt.');
              }, 4000);
            }, 4500);
          }, 1500);
        }
      })
      .catch(() => {
        message.reply('Sequenz 45896 wurde abgebrochen. Kehre in den normalen Modus zurück.');
      });
  },
};
