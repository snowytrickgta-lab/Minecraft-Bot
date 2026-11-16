const mineflayer = require('mineflayer');

function crearBot() {
  const bot = mineflayer.createBot({
    host: 'ElPuebleteMono.aternos.me',
    username: 'El_Primas777BOT',
    version: false,
    physicsEnabled: false
  });

  // En Minecraft 26.3 el servidor exige recibir 'tick_end' en cada tick
  // para no expulsar al bot por "Invalid move player packet received"
  bot.on('physicsTick', () => {
    if (bot._client && bot._client.state === 'play') {
      try {
        bot._client.write('tick_end', {});
      } catch (e) {}
    }
  });

  bot.on('spawn', () => {
    console.log('¡El_Primas777BOT conectado y estable en Minecraft 26.3!');
  });

  bot.on('kicked', (reason) => {
    console.log('EXPULSADO POR:', JSON.stringify(reason));
  });

  bot.on('error', (err) => {
    console.log('ERROR:', err.message);
  });

  bot.on('end', (reason) => {
    console.log('Desconectado. Razón:', reason, '| Reintentando en 30s...');
    setTimeout(crearBot, 30000);
  });
}

crearBot();
