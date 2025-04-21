exports.handler = async function () {
  const fakeData = {
    temperatura: 24.5,
    humedad: 62,
    fecha: new Date().toISOString()
  };

  return {
    statusCode: 200,
    body: JSON.stringify(fakeData)
  };
};
