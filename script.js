document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
  
    // Obtén los datos de los parámetros de la URL
    const patente = urlParams.get('patente') || 'No disponible';
    const empresa = urlParams.get('empresa') || 'No disponible';
    const nombre = urlParams.get('nombre') || 'No disponible';
    const rut = urlParams.get('rut') || 'No disponible';
    const contacto = urlParams.get('contacto') || 'No disponible';
  
    // Muestra los datos en la página
    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = `
      <p><strong>Patente:</strong> ${patente}</p>
      <p><strong>Empresa:</strong> ${empresa}</p>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>RUT:</strong> ${rut}</p>
      <p><strong>Contacto:</strong> ${contacto}</p>
    `;
  
    // Genera la URL para el código QR
    const qrData = `Patente: ${patente} | Empresa: ${empresa} | Nombre: ${nombre} | RUT: ${rut} | Contacto: ${contacto}`;
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}`;
  
    // Muestra el código QR en la página
    const qrCodeImg = document.getElementById('qr-code');
    qrCodeImg.src = qrCodeUrl;
  });
  