$(document).ready(function () {


    $('#buttonIniciar').click(function() {
        // Selecciona la primera tarjeta dentro del contenedorRutina
        var primeraTarjeta = $('#contenedorRutina .col-lg-2').first();

        // Verifica si hay una tarjeta para mover
        if (primeraTarjeta.length > 0) {
            // Mueve la tarjeta al contenedorRutinaHecha
            $('#contenedorRutinaHecha .row').append(primeraTarjeta);
        }
    });







})