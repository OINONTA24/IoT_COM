const fs = require("fs");
const path = require("path");

exports.handler = async () => {
  try {
    const filePath = path.join(__dirname, "data.json");
    const data = fs.readFileSync(filePath, "utf-8");

    return {
      statusCode: 200,
      body: data,
      headers: {
        "Content-Type": "application/json"
      }
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "No se encontraron datos." })
    };
  }
};
