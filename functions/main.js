fetch('/.netlify/functions/getData')
  .then(response => response.json())
  .then(data => {
    const latest = data[data.length - 1] || {};

    document.getElementById('temp').textContent = `${latest.temperatura ?? '--'} °C`;
    document.getElementById('hum').textContent = `${latest.humedad ?? '--'} %`;

    const mensaje = document.getElementById('mensaje');
    if (latest.humedad < 30) {
      mensaje.textContent = '⚠️ Alerta: Humedad baja, posible riego necesario.';
    } else {
      mensaje.textContent = '✅ Condiciones óptimas.';
    }
  })
  .catch(err => {
    document.getElementById('mensaje').textContent = 'Error al obtener datos.';
    console.error(err);
  });
