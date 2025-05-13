const fetch = require("node-fetch");
const DB_URL = process.env.FIREBASE_DB_URL;

exports.handler = async () => {
  try {
    const res = await fetch(`${DB_URL}/entries.json`);
    if (!res.ok) throw new Error(`Firebase respondió con código ${res.status}`);

    const obj = await res.json();
    if (!obj || typeof obj !== "object") throw new Error("No se obtuvieron datos válidos");

    const arr = Object.values(obj).filter(entry =>
      entry && 
      //entry.dispositivo === "4CE8C2" &&
      typeof entry.temperatura === 'number' &&
      typeof entry.humedad === 'number' &&
      typeof entry.bateria === 'number' &&
      typeof entry.fecha === 'string'
    );

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(arr)
    };

  } catch (err) {
    console.error("getData.js error:", err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
