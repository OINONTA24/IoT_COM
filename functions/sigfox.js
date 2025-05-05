const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

exports.handler = async (event) => {
  try {
    const payload = querystring.parse(event.body);

    const rawData = payload.data || '';
    const buffer = Buffer.from(rawData, 'hex');

    const temp = buffer.readUInt16BE(0) / 100;
    const hum = buffer.readUInt8(2);
    const bat = buffer.readUInt8(3) / 10;

    const data = {
      temperatura: temp,
      humedad: hum,
      bateria: bat,
      dispositivo: payload.device,
      fecha: new Date(payload.time * 1000).toISOString()
    };

    const filePath = path.join('/tmp', 'data.json');
    let existingData = [];

    try {
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        existingData = JSON.parse(fileContent);
      }
    } catch (e) {
      console.log('No se pudo leer el archivo, se creará uno nuevo.');
    }

    existingData.push(data);
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Datos recibidos correctamente' })
    };
  } catch (err) {
    console.error('Error en sigfox.js:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error procesando los datos de Sigfox' })
    };
  }
};
