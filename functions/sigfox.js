exports.handler = async (event, context) => {
    const data = event.body;
  
    console.log("Datos recibidos de Sigfox:", data);
  
    return {
      statusCode: 200,
      body: "OK"
    };
  };
  
