// functions/getData.js
const fs = require("fs");
const path = require("path");

exports.handler = async () => {
  try {
    const filePath = path.resolve(__dirname, "../data.json");
    const arr = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, "utf-8"))
      : [];
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(arr)
    };
  } catch (err) {
    console.error("Error en getData.js:", err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};

