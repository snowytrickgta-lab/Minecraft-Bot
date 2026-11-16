const mineflayer = require('mineflayer');

function crearBot() {
  const bot = mineflayer.createBot({
    host: 'ElPuebleteMono.aternos.me',
    username: 'El_Primas777BOT',
    version: false,
    physicsEnabled: false
  });

  bot.on('spawn', () => {
    console.log('¡El_Primas777BOT entró a ElPuebleteMono!');
  });

  bot.on('kicked', (reason) => console.log('Expulsado por:', reason));
  bot.on('error', (err) => console.log('Error:', err.message));

  bot.on('end', () => {
    console.log('Desconectado. Reintentando en 30 segundos...');
    setTimeout(crearBot, 30000);
  });
}

crearBot();
