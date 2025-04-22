const fs = require("fs");
const path = require("path");

exports.handler = async function (event) {
  try {
    const data = JSON.parse(event.body);

    const temperatura = data.temp || 0;
    const humedad = data.hum || 0;

    const newData = {
      temperatura,
      humedad,
      fecha: new Date().toISOString()
    };

    const filePath = path.join(__dirname, "data.json");
    fs.writeFileSync(filePath, JSON.stringify(newData));

    return {
      statusCode: 200,
      body: "Datos guardados correctamente"
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: "Error procesando los datos: " + err.message
    };
  }
};
