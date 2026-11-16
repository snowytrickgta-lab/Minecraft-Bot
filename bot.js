const mineflayer = require('mineflayer');

function crearBot() {
  const bot = mineflayer.createBot({
    host: 'ElPuebleteMono.aternos.me',
    username: 'El_Primas777BOT',
    version: false,
    physicsEnabled: false
  });

  // Inyecta 'tick_end' inmediatamente después de cada paquete de movimiento o posición
  // para evitar que los servidores 26.x lo expulsen a los 2 segundos
  const originalWrite = bot._client.write.bind(bot._client);
  bot._client.write = (name, params) => {
    const res = originalWrite(name, params);

    if (
      name === 'position' ||
      name === 'position_look' ||
      name === 'look' ||
      name === 'flying'
    ) {
      try {
        originalWrite('tick_end', {});
      } catch (e) {}
    }

    return res;
  };

  bot.on('spawn', () => {
    console.log('V2 - ¡El_Primas777BOT entró con parches de tick_end!');
  });

  // Imprime todo el objeto completo sin ocultar [Object]
  bot.on('kicked', (reason) => {
    console.log('EXPULSADO POR (COMPLETO):', JSON.stringify(reason, null, 2));
  });

  bot.on('error', (err) => {
    console.log('ERROR:', err.message);
  });

  bot.on('end', () => {
    console.log('Desconectado. Reintentando en 30 segundos...');
    setTimeout(crearBot, 30000);
  });
}

crearBot();
