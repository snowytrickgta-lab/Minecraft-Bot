const mineflayer = require('mineflayer');

function crearBot() {
  const bot = mineflayer.createBot({
    host: 'ElPuebleteMono.aternos.me',
    username: 'El_Primas777BOT',
    version: false,
    physicsEnabled: false
  });

  let confirmoEntrada = false;

  const originalWrite = bot._client.write.bind(bot._client);
  bot._client.write = (name, params) => {
    // Permite únicamente la confirmación inicial de posición al aparecer en el mundo
    if (name === 'teleport_confirm') {
      confirmoEntrada = true;
      return originalWrite(name, params);
    }

    // Bloquea todos los paquetes de movimiento y rotación
    if (
      name === 'position' ||
      name === 'position_look' ||
      name === 'look' ||
      name === 'flying'
    ) {
      // Si es el primer paquete justo después del teleport_confirm y tiene números válidos, lo deja pasar una vez
      if (confirmoEntrada && params && typeof params.x === 'number' && !Number.isNaN(params.x)) {
        confirmoEntrada = false;
        return originalWrite(name, params);
      }
      return; // Bloquea todo movimiento posterior
    }

    return originalWrite(name, params);
  };

  bot.on('spawn', () => {
    console.log('¡El_Primas777BOT entró y confirmó su posición sin moverse!');
  });

  bot.on('kicked', (reason) => console.log('EXPULSADO POR:', JSON.stringify(reason)));
  bot.on('error', (err) => console.log('ERROR:', err.message));

  bot.on('end', () => {
    console.log('Desconectado. Reintentando en 30 segundos...');
    setTimeout(crearBot, 30000);
  });
}

crearBot();
