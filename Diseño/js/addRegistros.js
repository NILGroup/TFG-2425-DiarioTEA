
$(document).ready(function () {

    var fecha = new Date().toISOString().split('T')[0];
    var hora = new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });

    $('#fecha').val(fecha);
    $('#hora').val(hora);

    $('#mostrarEmociones').hide();
    $('#mostrarPictos').hide();

    $('#eleccionEmociones').on('click', function (event) {
        event.preventDefault();
        $("#decisionPictos").fadeOut(function(){
            $('#mostrarEmociones').fadeIn();
        });
    });

    $('#eleccionPictos').on('click', function (event) {
        event.preventDefault();
        $("#decisionPictos").fadeOut(function(){
            $('#mostrarPictos').fadeIn();
        });
    });


    $('#volverEmociones').on('click', function(event){
        event.preventDefault();
        $("#mostrarEmociones").fadeOut(function(){
            $('#decisionPictos').fadeIn();
        });
    });

    $('#volverPictos').on('click', function(event){
        event.preventDefault();
        $("#mostrarPictos").fadeOut(function(){
            $('#decisionPictos').fadeIn();
        });
    });

    /*
    $("#mostrarPictos, #mostrarEmociones, #tablero").on("click", ".col-lg-3, .col-md-4", function (event) {
        event.preventDefault();
        let card = $(this);
        let contenedorPictogramas = $("#contenedorPictogramas");

        if (card.parent().is(contenedorPictogramas)) {
            // Volver al contenedor original y restaurar el orden
            let originalContainer = card.data("originalContainer");
            let index = card.attr("data-index");

            let inserted = false;
            originalContainer.children(".card").each(function () {
                if (parseInt($(this).attr("data-index")) > index) {
                    $(this).before(card);
                    inserted = true;
                    return false; // Salir del bucle
                }
            });

            // Si no se insertó antes de otro, agregar al final
            if (!inserted) {
                $('#tablero').append(card);
            }
            card.find(".cross-icon").remove();

        } else {
            // Mover al contenedor de pictogramas
            contenedorPictogramas.append(card);
            card.append('<span class="cross-icon">✖</span>');

        }
    });
*/

$("#mostrarPictos, #mostrarEmociones, #contenedorPictogramas").on("click", ".card", function (event) {
    event.preventDefault();
    
    let card = $(this).closest(".col-lg-3, .col-md-4"); // Selecciona la columna que contiene la tarjeta
    let contenedorPictogramas = $("#contenedorPictogramas");

    // Verificar si la tarjeta ya está en el contenedor de pictogramas
    if (card.parent().is(contenedorPictogramas)) {
        // Recuperar el contenedor original
        let originalContainer = card.data("originalContainer");
        let index = card.attr("data-index");

        if (originalContainer && originalContainer.length) {
            let inserted = false;

            // Restaurar en la posición correcta
            originalContainer.children(".col-lg-3, .col-md-4").each(function () {
                if (parseInt($(this).attr("data-index")) > index) {
                    $(this).before(card);
                    inserted = true;
                    return false; // Salir del bucle
                }
            });

            // Si no se insertó antes de otro, agregar al final
            if (!inserted) {
                originalContainer.append(card);
            }

            // Eliminar el botón de cierre
            card.find(".cross-icon").remove();
        }

    } else {
        // Guardar el contenedor original solo la primera vez que se mueve
        if (!card.data("originalContainer")) {
            card.data("originalContainer", card.parent());
            card.attr("data-index", card.index()); // Guarda su posición original
        }

        // Mover la tarjeta al contenedor de pictogramas
        contenedorPictogramas.append(card);
        card.append('<span class="cross-icon">✖</span>'); // Agrega el botón de eliminar
    }
});



});

