document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
  
    // Obtén los datos de los parámetros de la URL
    const fecharespuesta = urlParams.get('fecharespuesta') || 'No disponible';
    const patente = urlParams.get('patente') || 'No disponible';
    const empresa = urlParams.get('empresa') || 'No disponible';
    const nombre = urlParams.get('nombre') || 'No disponible';
    const rut = urlParams.get('rut') || 'No disponible';
    const contacto = urlParams.get('contacto') || 'No disponible';
    const fechainicio = urlParams.get('fechainicio') || 'No disponible';
    const fechatermino = urlParams.get('fechatermino') || 'No disponible';
  
    // Muestra los datos en la página
    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = `
      <p><strong>Fecha de Respuesta:</strong> ${fecharespuesta}</p>
      <p><strong>Patente:</strong> ${patente}</p>
      <p><strong>Empresa:</strong> ${empresa}</p>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>RUT:</strong> ${rut}</p>
      <p><strong>Contacto:</strong> ${contacto}</p>
      <p><strong>Fecha de inicio:</strong> ${fechainicio}</p>
      <p><strong>Fecha de término:</strong> ${fechatermino}</p>
    `;
  
    // Construye la URL para el código QR
    const baseURL = "https://matiasleon2000.github.io/reg/"; // Cambia esto a la URL de tu página
    const qrData = `${baseURL}?fecharespuesta=${encodeURIComponent(fecharespuesta)}&patente=${encodeURIComponent(patente)}&empresa=${encodeURIComponent(empresa)}&nombre=${encodeURIComponent(nombre)}&rut=${encodeURIComponent(rut)}&contacto=${encodeURIComponent(contacto)}&fechainicio=${encodeURIComponent(fechainicio)}&fechatermino=${encodeURIComponent(fechatermino)}`;
    
    // Añade un parámetro único para evitar el caché del navegador
    const timestamp = new Date().getTime();
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}&timestamp=${timestamp}`;
  
    // Muestra el código QR en la página
    const qrCodeImg = document.getElementById('qr-code');
    qrCodeImg.src = qrCodeUrl;
});
