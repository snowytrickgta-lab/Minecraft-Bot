const mineflayer = require('mineflayer');

function crearBot() {
  const bot = mineflayer.createBot({
    host: 'ElPuebleteMono.aternos.me',
    username: 'El_Primas777BOT',
    version: false,
    physicsEnabled: false
  });

  // Desactiva por completo el envío de cualquier paquete de movimiento
  const originalWrite = bot._client.write.bind(bot._client);
  bot._client.write = (name, params) => {
    if (
      name === 'position' ||
      name === 'position_look' ||
      name === 'look' ||
      name === 'flying'
    ) {
      return; // No envía ningún paquete de movimiento al servidor
    }
    return originalWrite(name, params);
  };

  bot.on('spawn', () => {
    console.log('¡El_Primas777BOT entró sin enviar paquetes de movimiento!');
  });

  bot.on('kicked', (reason) => console.log('Expulsado por:', JSON.stringify(reason)));
  bot.on('error', (err) => console.log('Error:', err.message));

  bot.on('end', () => {
    console.log('Desconectado. Reintentando en 30 segundos...');
    setTimeout(crearBot, 30000);
  });
}

crearBot();
