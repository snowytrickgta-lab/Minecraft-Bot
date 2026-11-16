const mc = require('minecraft-protocol');

function crearBot() {
  const client = mc.createClient({
    host: 'ElPuebleteMono.aternos.me',
    username: 'El_Primas777BOT',
    version: false
  });

  client.on('login', () => {
    console.log('¡El_Primas777BOT entró al servidor!');
  });

  // Confirma el teletransporte inicial, pero NO envía ningún paquete de posición
  client.on('position', (packet) => {
    if (packet.teleportId !== undefined) {
      client.write('teleport_confirm', { teleportId: packet.teleportId });
      console.log('Teletransporte confirmado (sin enviar paquetes de movimiento).');
    }
  });

  client.on('kick_disconnect', (packet) => {
    console.log('EXPULSADO POR:', JSON.stringify(packet));
  });

  client.on('disconnect', (packet) => {
    console.log('DESCONECTADO:', JSON.stringify(packet));
  });

  client.on('error', (err) => {
    console.log('ERROR:', err.message);
  });

  client.on('end', (reason) => {
    console.log('Conexión cerrada:', reason, '| Reintentando en 30s...');
    setTimeout(crearBot, 30000);
  });
}

crearBot();
