const mineflayer = require('mineflayer');

function crearBot() {
  const bot = mineflayer.createBot({
    host: 'ElPuebleteMono.aternos.me',
    username: 'El_Primas777BOT',
    version: false
  });

  bot.physicsEnabled = false;
  let tickInterval = null;

  // Inicia tick_end desde 'login' (antes del spawn) para cubrir desde el primer milisegundo
  bot.on('login', () => {
    console.log('Login completado, activando tick_end...');
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

  bot.on('spawn', () => {
    console.log('¡El_Primas777BOT entró al servidor!');
  });

  // Escucha todo el texto del chat de forma compatible con formatos personalizados de Aternos
  bot.on('messagestr', (message) => {
    // Busca si el mensaje contiene "!vienen las primas" y extrae el nombre del jugador
    if (message.toLowerCase().includes('!vienen las primas')) {
      // Detecta formatos típicos como "<Jugador> !vienen las primas" o "Jugador: !vienen las primas"
      const match = message.match(/^<([^>]+)>/) || message.match(/^([a-zA-Z0-9_]{3,16}):/);
      if (match && match[1] !== bot.username) {
        const jugador = match[1];
        setTimeout(() => {
          bot.chat(`/msg ${jugador} DONDE, LAS NECESITO!, PASAME SUS NUMEROS`);
        }, 500);
      }
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
