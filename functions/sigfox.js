const querystring = require('querystring');
const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  const payload = querystring.parse(event.body);

  // Verifica que esté llegando bien
  console.log("Payload recibido:", payload);

  const rawData = payload.data || "";
  const temp = parseInt(rawData.substring(0, 2), 16);
  const hum = parseInt(rawData.substring(2, 4), 16);
  const bat = parseInt(rawData.substring(4, 6), 16) / 10;

  const data = {
    temperatura: temp,
    humedad: hum,
    bateria: bat,
    dispositivo: payload.device,
    fecha: new Date(payload.time * 1000).toISOString()
  };

  const filePath = path.join(__dirname, '..', 'data.json');
  let existingData = [];

  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    existingData = JSON.parse(fileContent);
  } catch (e) {
    console.log("No se pudo leer el archivo o estaba vacío, se creará uno nuevo.");
  }

  existingData.push(data);

  fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Datos recibidos correctamente' })
  };
};
