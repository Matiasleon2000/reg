function onFormSubmit(e) {
  if (!e || !e.range) {
    Logger.log("El objeto de evento no está definido.");
    return;
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var row = e.range.getRow();

  // Obtiene los datos del formulario
  var fecharespuesta = sheet.getRange(row, 1).getValue();
  var patente = sheet.getRange(row, 2).getValue(); // Columna B
  var empresa = sheet.getRange(row, 3).getValue(); // Columna C
  var rutempresa = sheet.getRange(row, 4).getValue(); // Columna C    
  var nombre = sheet.getRange(row, 6).getValue();  // Columna E
  var apellidopaterno = sheet.getRange(row, 7).getValue();  // Columna E
  var apellidomaterno = sheet.getRange(row, 8).getValue();  // Columna E
  var rut = sheet.getRange(row, 9).getValue();     // Columna F
  var contacto = sheet.getRange(row, 10).getValue(); // Columna G
  var email = sheet.getRange(row, 11).getValue(); // Columna G

  var fechainicio = sheet.getRange(row, 10).getValue(); // Columna J
  var fechatermino = sheet.getRange(row, 12).getValue(); // Columna L

  // Verifica si las fechas son válidas antes de formatearlas
  var fechainicioFormatted = fechainicio instanceof Date ? Utilities.formatDate(fechainicio, Session.getScriptTimeZone(), "yyyy-MM-dd") : "Fecha inválida";
  var fechaterminoFormatted = fechatermino instanceof Date ? Utilities.formatDate(fechatermino, Session.getScriptTimeZone(), "yyyy-MM-dd") : "Fecha inválida";
  var fecharespuestaFormatted = fecharespuesta instanceof Date ? Utilities.formatDate(fecharespuesta, Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss") : "Fecha inválida";

  // Obtén el correo electrónico del formulario (asumiendo que está en la columna H)
  var email = sheet.getRange(row, 8).getValue(); // Ajusta esta columna según corresponda

  // Construye la URL con los datos del formulario
  var baseURL = "https://matiasleon2000.github.io/reg/"; // Cambia esto a la URL correcta de tu página de confirmación
  var data = "fecharespuesta=" + encodeURIComponent(fecharespuestaFormatted) +
             "&patente=" + encodeURIComponent(patente) +
             "&empresa=" + encodeURIComponent(empresa) +
             "&nombre=" + encodeURIComponent(nombre) +
             "&rut=" + encodeURIComponent(rut) +
             "&contacto=" + encodeURIComponent(contacto) +
             "&fechainicio=" + encodeURIComponent(fechainicioFormatted) +
             "&fechatermino=" + encodeURIComponent(fechaterminoFormatted);

  // Genera la URL del código QR
  var qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodeURIComponent(baseURL + "?" + data);

  // Inserta la URL del código QR en la columna adecuada
  sheet.getRange(row, 14).setValue(qrCodeUrl); // Ajusta la columna para la URL del código QR

  // Inserta la imagen del código QR directamente en la celda
  var formula = '=IMAGE("' + qrCodeUrl + '")';
  sheet.getRange(row, 15).setFormula(formula); // Ajusta la columna para la celda donde se debe mostrar la imagen

  // --- Ajuste de tamaño de celdas para el código QR ---
  sheet.setRowHeight(row, 100);  // Ajusta el tamaño a 100 píxeles
  sheet.setColumnWidth(15, 100);  // Ajusta el tamaño a 100 píxeles

  // --- Obtener la fecha del día actual ---
  var fechaHoy = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd");

  // Construye la URL para la página de confirmación
  var confirmPageUrl = "https://matiasleon2000.github.io/reg/"; // Cambia esto a la URL correcta de tu página de confirmación
  var confirmUrl = confirmPageUrl + "?fecharespuesta=" + encodeURIComponent(fecharespuestaFormatted) +
                   "&patente=" + encodeURIComponent(patente) +
                   "&empresa=" + encodeURIComponent(empresa) +
                   "&nombre=" + encodeURIComponent(nombre) +
                   "&rut=" + encodeURIComponent(rut) +
                   "&contacto=" + encodeURIComponent(contacto) +
                   "&fechainicio=" + encodeURIComponent(fechainicioFormatted) +
                   "&fechatermino=" + encodeURIComponent(fechaterminoFormatted);

  // Envía un correo electrónico con el enlace de confirmación
  if (email) {
    var subject = "Confirmación de Registro";
    var body = "Gracias por tu registro. Puedes ver tus datos y el código QR en el siguiente enlace: " + confirmUrl;
    MailApp.sendEmail(email, subject, body);
  }

  // Redirige al usuario a la página de confirmación
  return HtmlService.createHtmlOutput("Redirigiendo a la página de confirmación... <script>window.location='" + confirmUrl + "'</script>");
}
