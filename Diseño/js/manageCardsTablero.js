$(document).ready(function () {



    $("#columnaFormDiario .card").each(function (index) {
        $(this).attr("data-index", index); // Guarda el índice original
        $(this).data("originalContainer", $(this).parent()); // Guarda el contenedor original
    });

    $(".row").on("click", ".card", function () {
        let card = $(this);
        let contenedorPictogramas = $("#rowPictogramas");

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
                originalContainer.append(card);
            }
            card.find(".cross-icon").remove();

        } else {
            // Mover al contenedor de pictogramas
            contenedorPictogramas.append(card);
            card.append('<span class="cross-icon">&times</span>');

        }
    });










})