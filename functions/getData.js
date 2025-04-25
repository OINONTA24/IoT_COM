const fs = require("fs");
const path = require("path");

exports.handler = async () => {
  try {
    const filePath = path.join(__dirname, "data.json");
    const rawData = fs.readFileSync(filePath, "utf-8");
    const jsonData = JSON.parse(rawData);

    return {
      statusCode: 200,
      body: JSON.stringify(jsonData)
    };
  } catch (err) {
    console.error("❌ Error leyendo data.json:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "No se encontraron datos." })
    };
  }
};
