const mineflayer = require('mineflayer');

function crearBot() {
  const bot = mineflayer.createBot({
    host: 'ElPuebleteMono.aternos.me',
    username: 'El_Primas777BOT',
    version: false,
    physicsEnabled: false,
    brand: 'vanilla',
    // Desactiva por completo los módulos internos de físicas y movimiento
    plugins: {
      physics: false,
      entities: false,
      ray_trace: false,
      digging: false,
      place_block: false
    }
  });

  // Bloquea absolutamente todos los paquetes de posición, rotación y acción física
  const paquetesBloqueados = new Set([
    'position',
    'position_look',
    'look',
    'flying',
    'entity_action',
    'arm_animation',
    'held_item_slot',
    'abilities'
  ]);

  const originalWrite = bot._client.write.bind(bot._client);
  bot._client.write = (name, params) => {
    if (paquetesBloqueados.has(name)) {
      return; // No envía ningún dato físico o de movimiento al servidor
    }
    return originalWrite(name, params);
  };

  bot.on('login', () => {
    console.log('Conectado al servidor.');
  });

  bot.on('spawn', () => {
    console.log('¡El_Primas777BOT entró sin físicas ni movimiento!');
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
