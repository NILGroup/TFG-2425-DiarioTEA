
$(document).ready(function () {

    var fecha = new Date().toISOString().split('T')[0];
    var hora = new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });

    $('#fecha').val(fecha);
    $('#hora').val(hora);

    $('#editar-btn').click(function () {
        $('#fecha').removeAttr('readonly');
        $('#hora').removeAttr('readonly');
        $('#editar-btn').hide();
    });



    $("#mostrarPictos, #mostrarEmociones, #contenedorPictogramas").on("click", ".card", function (event) {
        event.preventDefault();

        let card = $(this).closest(".col-lg-2, .col-md-3, .mt-3");
        let contenedorPictogramas = $("#contenedorPictogramas");

        if (card.parent().is(contenedorPictogramas)) {
            let originalContainer = card.data("originalContainer");
            let index = card.attr("data-index");

            if (originalContainer && originalContainer.length) {
                let inserted = false;

                originalContainer.children(".col-lg-3, .col-md-4").each(function () {
                    if (parseInt($(this).attr("data-index")) > index) {
                        $(this).before(card);
                        inserted = true;
                        return false;
                    }
                });

                if (!inserted) {
                    originalContainer.append(card);
                }

                card.find(".cross-icon").remove();
            }

        } else {
            if (!card.data("originalContainer")) {
                card.data("originalContainer", card.parent());
                card.attr("data-index", card.index());
            }

            let tarjeta = card.find(".card"); // Busca la tarjeta dentro de la columna
            tarjeta.append('<span class="cross-icon">&times</span>'); // Añade el icono dentro de la tarjeta
            contenedorPictogramas.append(card); // Mueve la columna completa

        }
    });




});

