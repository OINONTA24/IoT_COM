// functions/sigfox.js
const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const rawData = body.data;

    // Extraer cada par de caracteres hexadecimales
    const tempHex = rawData.slice(0, 2);
    const humHex = rawData.slice(2, 4);
    const batHex = rawData.slice(4, 6);

    const temperatura = parseInt(tempHex, 16);       // Ej. '1c' -> 28
    const humedad = parseInt(humHex, 16);            // Ej. '3a' -> 58
    const bateria = parseInt(batHex, 16) / 10;       // Ej. '25' -> 37 -> 3.7V

    const newData = {
      temperatura,
      humedad,
      bateria,
      fecha: new Date(body.time * 1000).toISOString(),
      dispositivo: body.device
    };

    const filePath = path.join(__dirname, "data.json");
    fs.writeFileSync(filePath, JSON.stringify(newData));

    return {
      statusCode: 200,
      body: "Datos procesados correctamente"
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: "Error: " + error.message
    };
  }
};

