$(document).ready(function () {


    $('#buttonIniciar').click(function () {
        if ($('#contenedorRutina .col-lg-2').length === 0) {
            window.location.href="/rutinas/mis-rutinas";
        }
        // Selecciona la primera tarjeta dentro del contenedorRutina
        var primeraTarjeta = $('#contenedorRutina .col-lg-2').first();
        var imagenBtnActual = $('#buttonIniciar').find('img').attr('src');

        console.log(imagenBtnActual);
        if (imagenBtnActual === "/images/config/iniciar.png") {

            if (primeraTarjeta.length > 0) {

                var imagenTarjeta = primeraTarjeta.find('.card-img').attr('src');
                $('#buttonIniciar .card-img').attr('src', imagenTarjeta);
                var ocultarTarjeta = primeraTarjeta.find('.card');

                // $('#contenedorRutinaHecha .row').append(primeraTarjeta);

            }

            else {
                $('#buttonIniciar .card-img').attr('src', "/images/config/iniciar.png");

            }
        } else {

            $('#contenedorRutinaHecha .row').append(primeraTarjeta);
            $('#buttonIniciar .card-img').attr('src', "/images/config/iniciar.png");

        }
        // Verifica si el contenedorRutina está vacío
        if ($('#contenedorRutina .col-lg-2').length === 0) {
            $('#buttonIniciar .card-img').attr('src', "/images/config/botonvolver.png");
          $('#terminado').text("Enhorabuena, has terminado la rutina");
        }
    });

    







});