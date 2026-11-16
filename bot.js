const mineflayer = require('mineflayer');

function crearBot() {
  const bot = mineflayer.createBot({
    host: 'ElPuebleteMono.aternos.me',
    username: 'El_Primas777BOT',
    version: false
  });

  // Desactiva las físicas al inicio para evitar caídas o movimientos durante la carga
  bot.physicsEnabled = false;

  // Parche para 26.3: envía tick_end cada 50ms (1 tick de Minecraft) una vez dentro
  let tickInterval = null;

  bot.on('spawn', () => {
    console.log('¡El_Primas777BOT entró al servidor!');
    if (!tickInterval) {
      tickInterval = setInterval(() => {
        if (bot._client && bot._client.state === 'play') {
          try {
            bot._client.write('tick_end', {});
          } catch (e) {}
        }
      }, 50);
    }
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;
    if (message.toLowerCase().includes('!vienen las primas')) {
      bot.chat(`/msg ${username} DONDE, LAS NECESITO!, PASAME SUS NUMEROS`);
    }
  });

  bot.on('kicked', (reason) => console.log('Expulsado:', JSON.stringify(reason)));
  bot.on('error', (err) => console.log('Error:', err.message));

  bot.on('end', () => {
    if (tickInterval) {
      clearInterval(tickInterval);
      tickInterval = null;
    }
    console.log('Desconectado. Reintentando en 30 segundos...');
    setTimeout(crearBot, 30000);
  });
}

crearBot();
