// functions/sigfox.js
const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  try {
    // 1) Parsear el JSON que envía Sigfox
    const payload = JSON.parse(event.body);

    // 2) Decodificar el hex de payload.data
    const buf = Buffer.from(payload.data, "hex");
    const temp = buf.readUInt16BE(0) / 100;
    const hum  = buf.readUInt8(2);
    const bat  = buf.readUInt8(3) / 10;

    // 3) Crear la entrada
    const entry = {
      temperatura: temp,
      humedad:    hum,
      bateria:    bat,
      dispositivo: payload.device,
      fecha:      new Date(payload.time * 1000).toISOString()
    };

    // 4) Leer el JSON existente (si lo hubiera) y añadir la nueva entrada
    const filePath = path.resolve(__dirname, "../data.json");
    const arr = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, "utf-8"))
      : [];
    arr.push(entry);

    // 5) Guardar de nuevo
    fs.writeFileSync(filePath, JSON.stringify(arr, null, 2));

    return { statusCode: 200, body: "OK" };
  } catch (err) {
    console.error("Error en sigfox.js:", err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
