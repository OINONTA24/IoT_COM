const fetch = require("node-fetch");
const DB_URL = process.env.FIREBASE_DB_URL;

exports.handler = async (event) => {
  try {
    const payload = JSON.parse(event.body);
    const buf     = Buffer.from(payload.data, "hex");

    const temperatura = buf.readUInt16BE(0) / 100;
    const bateria     = buf.readUInt16BE(2) / 100;

    // Latitud y longitud (cada una 8 bytes)
    const lat_hex = payload.data.slice(8, 16); // caracteres 8 a 15
    const lon_hex = payload.data.slice(16);    // caracteres 16 en adelante

    const lat = parseInt(lat_hex, 16) / 1000000;
    const lon = parseInt(lon_hex, 16) / 1000000;

    const entry = {
      temperatura,
      bateria,
      latitud: lat,
      longitud: lon,
      dispositivo: payload.device,
      fecha: new Date(payload.time * 1000).toISOString()
    };

    // Guarda en Firebase
    const res = await fetch(`${DB_URL}/entries.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(entry)
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
