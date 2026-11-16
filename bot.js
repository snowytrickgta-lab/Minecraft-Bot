const mineflayer = require('mineflayer');

function crearBot() {
  const bot = mineflayer.createBot({
    host: 'ElPuebleteMono.aternos.me',
    username: 'El_Primas777BOT',
    version: false,
    plugins: {
      physics: false
    }
  });

  // Evita que Mineflayer envíe paquetes de posición o rotación vacíos
  bot._client.on('packet', (data, meta) => {
    if (meta.name === 'position') {
      bot._client.write('teleport_confirm', { teleportId: data.teleportId });
    }
  });

  bot.on('login', () => {
    console.log('¡Conectado sin físicas!');
  });

  bot.on('kicked', (reason) => console.log('Expulsado:', JSON.stringify(reason)));
  bot.on('error', (err) => console.log('Error:', err.message));

  bot.on('end', () => {
    console.log('Desconectado. Reintentando en 30 segundos...');
    setTimeout(crearBot, 30000);
  });
}

crearBot();

