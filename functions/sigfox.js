const fetch = require("node-fetch");
const DB_URL = process.env.FIREBASE_DB_URL;

exports.handler = async (event) => {
  try {
    const payload = JSON.parse(event.body);
    const buf     = Buffer.from(payload.data, "hex");

    const temperatura = buf.readUInt16BE(0) / 10;  // primeros 2 bytes (4 hex)
    const bateria     = buf.readUInt16BE(2) / 100;  // siguientes 2 bytes (4 hex)

    const entry = {
      temperatura,
      bateria,
      dispositivo: payload.device,
      fecha: new Date(payload.time * 1000).toISOString()
    };

    // Guardar en Firebase
    const res = await fetch(`${DB_URL}/entries.json`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(entry)
    });

    if (!res.ok) throw new Error(`Firebase respondió ${res.status}`);

    return { statusCode: 200, body: "OK" };
  } catch (err) {
    console.error("sigfox.js error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
