$(document).ready(function () {


    $('#buttonIniciar').click(function () {
        // Selecciona la primera tarjeta dentro del contenedorRutina
        var primeraTarjeta = $('#contenedorRutina .col-lg-2').first();
        



        if (primeraTarjeta.length > 0) {
            var imagenTarjeta = primeraTarjeta.find('.card-img').attr('src');
            $('#buttonIniciar .card-img').attr('src', imagenTarjeta);
            $('#contenedorRutinaHecha .row').append(primeraTarjeta);
            
        }
        else{
            $('#buttonIniciar .card-img').attr('src', "images/config/iniciar.png");
        }
    });







})