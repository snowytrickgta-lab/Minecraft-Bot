const mc = require('minecraft-protocol');

function crearBot() {
  const client = mc.createClient({
    host: 'ElPuebleteMono.aternos.me',
    username: 'El_Primas777BOT',
    version: false // Detecta automáticamente la versión 26.3 del servidor
  });

  client.on('login', () => {
    console.log('¡El_Primas777BOT conectado mediante protocolo puro!');
  });

  // Cuando el servidor envía la posición inicial (spawn), confirmamos el teletransporte
  // y devolvemos exactamente las mismas coordenadas recibidas sin modificar nada
  client.on('position', (packet) => {
    console.log('Posición inicial recibida del servidor:', packet.x, packet.y, packet.z);
    if (packet.teleportId !== undefined) {
      client.write('teleport_confirm', { teleportId: packet.teleportId });
    }
    client.write('position_look', {
      x: packet.x,
      y: packet.y,
      z: packet.z,
      yaw: packet.yaw,
      pitch: packet.pitch,
      onGround: false,
      flags: 0
    });
  });

  client.on('kick_disconnect', (packet) => {
    console.log('EXPULSADO POR EL SERVIDOR:', JSON.stringify(packet));
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
