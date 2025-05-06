const fetch = require("node-fetch");
const DB_URL = process.env.FIREBASE_DB_URL;

exports.handler = async () => {
  try {
    const res = await fetch(`${DB_URL}/entries.json`);
    if (!res.ok) throw new Error(`Firebase respondió ${res.status}`);

    const obj = await res.json();      // { key1: entry1, key2: entry2, … }
    const arr = Object.values(obj || {});

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(arr)
    };
  } catch (err) {
    console.error("getData.js error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
