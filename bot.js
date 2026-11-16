const mineflayer = require('mineflayer');

function crearBot() {
  const bot = mineflayer.createBot({
    host: 'ElPuebleteMono.aternos.me',
    username: 'El_Primas777BOT',
    version: false,
    physicsEnabled: false
  });

  // Intercepta la escritura de paquetes: deja pasar teleport_confirm y keep_alive,
  // pero bloquea absolutamente todos los paquetes de posición
  const originalWrite = bot._client.write.bind(bot._client);
  bot._client.write = (name, params) => {
    if (name === 'position' || name === 'position_look') {
      return; // Bloquea todo paquete de coordenadas que provoca "Invalid move player packet"
    }
    return originalWrite(name, params);
  };

  bot.on('spawn', () => {
    console.log('¡El_Primas777BOT conectado y estable en ElPuebleteMono!');
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
