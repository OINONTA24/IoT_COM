const fs = require("fs");
const path = require("path");

exports.handler = async (event) => {
  try {
    const payload = JSON.parse(event.body);

    const rawData = payload.data; // ejemplo: "03a40f7d"
    const buffer = Buffer.from(rawData, "hex");

    // Supongamos que el formato de envío es:
    // Byte 0-1: Temperatura (2 bytes)
    // Byte 2: Humedad (1 byte)
    // Byte 3: Batería (1 byte)
    
    const temp = buffer.readUInt16BE(0) / 100;  // ejemplo: 0x03a4 = 932 → 9.32°C
    const hum = buffer.readUInt8(2);            // ejemplo: 0x0f = 15%
    const bat = buffer.readUInt8(3) / 10;        // ejemplo: 0x7d = 125 → 12.5V

    const data = {
      temperatura: temp,
      humedad: hum,
      bateria: bat,
      dispositivo: payload.device,
      fecha: new Date(payload.time * 1000).toISOString()
    };


    const filePath = path.join(__dirname, "data.json");
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    console.log("✅ Datos decodificados y guardados:", data);

    return {
      statusCode: 200,
      body: "OK"
    };

  } catch (err) {
    console.error("❌ Error en sigfox.js:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error procesando los datos de Sigfox" })
    };
  }
};
