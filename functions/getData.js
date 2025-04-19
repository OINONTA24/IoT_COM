exports.handler = async () => {
  const datosDePrueba = [
    {
      fecha: new Date().toISOString(),
      temperatura: 22,
      humedad: 45
    }
  ];

  return {
    statusCode: 200,
    body: JSON.stringify(datosDePrueba)
  };
};
