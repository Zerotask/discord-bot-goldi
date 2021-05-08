const { getRandomNumber } = require('../functions');

module.exports = {
  name: 'geringverdiener',
  aliases: ['justus', 'abgehoben'],
  description: 'Aus dem Weg, Geringverdiener',
  execute(message) {
    const list = [
      'Ich, wenn ich meinen Einkaufswagen mit einer 2€ Münze löse, zu allen, die einen Einkaufschip benutzen - **AUS DEM WEG, GERINGVERDIENER!**',
      'Wenn Leute bei Schnee zuerst an Schlitten fahren denken - **AUS DEM WEG, GERINGVERDIENER!**',
      'Im Gegensatz zu Geld macht Liebe glücklich - **AUS DEM WEG, GERINGVERDIENER!**',
      'Die Firma, in der du arbeitest, trägt nicht deinen Nachnamen? - **AUS DEM WEG, GERINGVERDIENER!**',
      'Wenn du bei *junge Sterne* an den Nachthimmel denkst - **AUS DEM WEG, GERINGVERDIENER!**',
      'Wenn die SUV-Mutti auf dem Weg zum Bio-Markt die Fahrradfahrer beiseite hupt - **AUS DEM WEG, GERINGVERDIENER!**',
      'Woran erkennst du einer meiner Partys? Du bist nicht eingeladen - **AUS DEM WEG, GERINGVERDIENER!**',
      'Wieso müssen eigentlich manche Kommilitonen von mir einen Studienkredit aufnehmen? Man kann doch auch einfach ein paar Aktien verkaufen - **AUS DEM WEG, GERINGVERDIENER!**',
      'Gestern sagte mir meine Affäre, sie würde mich auch noch lieben, sollte ich mal kein Geld mehr haben. Was haben wir herzlich gelacht. Ich und kein Geld mehr haben... - **AUS DEM WEG, GERINGVERDIENER!**',
      'Wieso haben viele Studenten gegen Monatsende eigentlich kein Geld mehr? Man kann doch einfach zum Automaten gehen und welches holen - **AUS DEM WEG, GERINGVERDIENER!**',
      'Wer im Wohnheim sitzt, sollte nicht mit Scheinen werfen - **AUS DEM WEG, GERINGVERDIENER!**',
      'Du kannst dich nur knapp über Wasser halten, Monatsende, BAföG. Ich kann mich nur knapp über Wasser halten, Wasserski, Saint-Tropez - **AUS DEM WEG, GERINGVERDIENER!**',
      'Du steigst bei *MAN* ein, Vordertür. Ich steig bei *MAN* ein, Hauptaktionär - **AUS DEM WEG, GERINGVERDIENER!**',
      'Die erste Million ist die schwerste? Da hab ich ja nochmal Glück gehabt - **AUS DEM WEG, GERINGVERDIENER!**',
      'Wegen der Hitze hat uns Mutter heute kurzärmelige Hemden aus ihrer Boutique mitgebracht. Was haben Vater und ich wieder herzlich gelacht. Wir sind doch keine Busfahrer - **AUS DEM WEG, GERINGVERDIENER!**',
      'So kurz vor Weihnachten brauche auch ich mal eure Hilfe. Denkt ihr, mein altes iPhone ist okay zum Schrottwicheln oder sollte ich doch besser schnell noch ein Android-Handy kaufen gehen?  - **AUS DEM WEG, GERINGVERDIENER!**',
      'In meinem Freundeskreis herrscht Anwesenheitspflicht. Wer kein Anwesen hat, ist raus - **AUS DEM WEG, GERINGVERDIENER!**',
      'Ich bin wie Kohlensäure, denn ich steige aus der Limo - **AUS DEM WEG, GERINGVERDIENER!**',
      'Ein Blick auf meine Rolex verrät mir, es ist Zeit für eine Breitling - **AUS DEM WEG, GERINGVERDIENER!**',
      'Passt das Taschengeld in eine Tasche, ist dein Vater eine Flasche - **AUS DEM WEG, GERINGVERDIENER!**',
      'Eigentlich kaum zu ertragen, wie viel Armut es auf der Welt gibt. Gerade habe ich jemanden gesehen, der mit einem Opel Corsa zur Uni fahren musste - **AUS DEM WEG, GERINGVERDIENER!**',
      'Den armen Menschen, die am Straßenrand mit Gepäck und Daumen hoch stehen, und mir und meinem Porsche ein Like geben, gebe ich immer eines zurück :+1: - **AUS DEM WEG, GERINGVERDIENER!**',
      'Kennst du den Moment, wenn du lange auf etwas hin gespart hast und es dann endlich in den Händen hältst? Ich, Gott sei Dank, nicht - **AUS DEM WEG, GERINGVERDIENER!**',
      'Wenn das BAföG überwiesen wird und man sich erstmal die Empfehlung in der Mensa gönnt - **AUS DEM WEG, GERINGVERDIENER!**',
      'Wenn du im Supermarkt eine OP-Maske trägst und der vor dir nur eine FFP2-Maske auf hat - **AUS DEM WEG, GERINGVERDIENER!**',
    ];
    message.channel.send(list[getRandomNumber(0, list.length - 1)]);
  },
};
