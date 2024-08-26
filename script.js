// Función para obtener los parámetros de la URL
function getQueryParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const paramPairs = queryString.split("&");

    paramPairs.forEach(param => {
        const [key, value] = param.split("=");
        params[decodeURIComponent(key)] = decodeURIComponent(value);
    });

    return params;
}

// Llama a la función para obtener los datos
const data = getQueryParams();

// Inserta los datos en el contenedor correspondiente
const dataContainer = document.getElementById('data-container');
dataContainer.innerHTML = `
    <p><strong>Fecha de Respuesta:</strong> ${data.fecharespuesta}</p>
    <p><strong>Patente:</strong> ${data.patente}</p>
    <p><strong>Empresa:</strong> ${data.empresa}</p>
    <p><strong>Nombre:</strong> ${data.nombre}</p>
    <p><strong>RUT:</strong> ${data.rut}</p>
    <p><strong>Contacto:</strong> ${data.contacto}</p>
    <p><strong>Fecha de Inicio:</strong> ${data.fechainicio}</p>
    <p><strong>Fecha de Término:</strong> ${data.fechatermino}</p>
`;

// Inserta la URL del código QR en la imagen
const qrCodeImage = document.getElementById('qr-code');
qrCodeImage.src = data.qrCodeUrl; // Asegúrate de que `qrCodeUrl` esté correctamente generado en el Google Script
