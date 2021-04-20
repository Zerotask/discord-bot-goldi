const show = (message) => {
  const response = [];
  response.push(':money_mouth: :money_mouth: :money_mouth: **CRINGER PREMIUM LIFETIME** :money_mouth: :money_mouth: :money_mouth:');
  response.push('*-nichts für Geringverdiener-*');
  response.push('');
  response.push('Kaufe noch heute Cringer Premium Lifetime für nur 10 Bitcoins und erhalte 3 mal so viele Likes wie andere!');
  response.push('');
  response.push('Vorteile:');
  response.push('- **Premium-Profil**: zeige anderen, dass du es dir leisten kannst');
  response.push('- **Du wirst öfters in der Suche gezeigt**: schließlich bist du auch ein VIP');
  response.push('- **Ultraschneller DM-Versand**: deine DMs werden 60% schneller verschickt (beim Liken von anderen, aber auch wenn du ein Like erhältst)');
  response.push('- **Premium Support**: unser Premium-Support-Team wartet nur auf dich!');
  message.channel.send(response);
};

module.exports = { show };
