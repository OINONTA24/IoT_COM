const fs = require('fs');
const path = require('path');

exports.handler = async () => {
  try {
    const filePath = path.join('/tmp', 'data.json');
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      return {
        statusCode: 200,
        body: fileContent,
        headers: {
          'Content-Type': 'application/json'
        }
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify([]),
        headers: {
          'Content-Type': 'application/json'
        }
      };
    }
  } catch (err) {
    console.error('Error en getData.js:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al leer los datos' })
    };
  }
};
