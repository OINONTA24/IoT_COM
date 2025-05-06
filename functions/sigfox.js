const fs   = require("fs");
const path = require("path");

exports.handler = async (event) => {
  try {
    // 1) Parsear el JSON enviado por Sigfox
    const payload = JSON.parse(event.body);

    // 2) Decodificar el hex de payload.data
    const buf = Buffer.from(payload.data, "hex");
    const temp = buf.readUInt16BE(0) / 100;
    const hum  = buf.readUInt8(2);
    const bat  = buf.readUInt8(3) / 10;

    // 3) Crear la entrada
    const entry = {
      temperatura:  temp,
      humedad:      hum,
      bateria:      bat,
      dispositivo:  payload.device,
      fecha:        new Date(payload.time * 1000).toISOString()
    };

    // 4) Leer el archivo en /tmp, o crear array vacío
    const tmpFile = path.join("/tmp", "data.json");
    let arr = [];
    if (fs.existsSync(tmpFile)) {
      arr = JSON.parse(fs.readFileSync(tmpFile, "utf8"));
    }

    // 5) Añadir la nueva entrada y guardar de nuevo en /tmp/data.json
    arr.push(entry);
    fs.writeFileSync(tmpFile, JSON.stringify(arr, null, 2));

    return { statusCode: 200, body: "OK" };
  } catch (err) {
    console.error("❌ sigfox.js error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
