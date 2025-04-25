const fs = require("fs");
const path = require("path");

exports.handler = async () => {
  try {
    const filePath = path.join(__dirname, "data.json");
    const rawData = fs.readFileSync(filePath);
    const data = JSON.parse(rawData);

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*" // necesario para permitir llamadas desde HTML
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "No se pudo leer data.json" })
    };
  }
};
