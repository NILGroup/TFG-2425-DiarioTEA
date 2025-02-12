$(document).ready(function () {



    $("#columnaFormDiario .card").each(function (index) {
        $(this).attr("data-index", index); // Guarda el índice original
        $(this).data("originalContainer", $(this).parent()); // Guarda el contenedor original
    });

    $(".row").on("click", ".card", function (event) {
        event.preventDefault();
    
        let cardContainer = $(this).closest(".col-lg-2, .col-md-3"); // Contenedor de la tarjeta
        let contenedorPictogramas = $("#contenedorPictogramas");
        let rowSuperior = $("#columnaFormDiario .row.mt-3"); // Fila superior donde deben ir
    
        // Si la tarjeta ya está en contenedorPictogramas, moverla de vuelta a la fila superior
        if (cardContainer.parent().is(contenedorPictogramas)) {
            let originalContainer = cardContainer.data("originalContainer");
    
            if (originalContainer && originalContainer.length) {
                let inserted = false;
                let index = parseInt(cardContainer.attr("data-index"));
    
                // Intentar insertarlo en su posición original
                originalContainer.children(".col-lg-2, .col-md-3").each(function () {
                    if (parseInt($(this).attr("data-index")) > index) {
                        $(this).before(cardContainer);
                        inserted = true;
                        return false;
                    }
                });
    
                if (!inserted) {
                    originalContainer.append(cardContainer);
                }
            } else {
                // Si no tiene un contenedor original, llevarlo a la fila superior
                rowSuperior.append(cardContainer);
            }
    
            cardContainer.find(".cross-icon").remove(); // Quitar la cruz
    
        } else {
            // Guardar el contenedor original solo si no se ha guardado antes
            if (!cardContainer.data("originalContainer")) {
                cardContainer.data("originalContainer", cardContainer.parent());
                cardContainer.attr("data-index", cardContainer.index());
            }
    
            // Mover al contenedor de pictogramas
            cardContainer.append('<span class="cross-icon">&times</span>'); 
            contenedorPictogramas.append(cardContainer);
        }
    });
    
})