console.log("🌐 FIREBASE_DB_URL =", process.env.FIREBASE_DB_URL);
const fetch = require("node-fetch");
const DB_URL = process.env.FIREBASE_DB_URL;

exports.handler = async (event) => {
  try {
    const payload = JSON.parse(event.body);
    const buf     = Buffer.from(payload.data, "hex");

    const entry = {
      temperatura: buf.readUInt16BE(0) / 100,
      humedad:     buf.readUInt8(2),
      bateria:     buf.readUInt8(3) / 10,
      dispositivo: payload.device,
      fecha:       new Date(payload.time * 1000).toISOString()
    };

    // Guarda en Firebase Realtime Database bajo /entries
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
