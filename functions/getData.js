const fs   = require("fs");
const path = require("path");

exports.handler = async () => {
  try {
    const tmpFile = path.join("/tmp", "data.json");
    const arr = fs.existsSync(tmpFile)
      ? JSON.parse(fs.readFileSync(tmpFile, "utf8"))
      : [];
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(arr)
    };
  } catch (err) {
    console.error("❌ getData.js error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
