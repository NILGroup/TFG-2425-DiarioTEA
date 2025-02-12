$(document).ready(function () {



    $("#columnaFormDiario .card").each(function (index) {
        $(this).attr("data-index", index); // Guarda el índice original
        $(this).data("originalContainer", $(this).parent()); // Guarda el contenedor original
    });

    $(".row").on("click", ".card", function (event) {
        event.preventDefault();
    
        let cardContainer = $(this).closest(".col-lg-2, .col-md-3");
        let contenedorPictogramas = $("#contenedorPictogramas");
        let rowPictos = $("#columnaFormDiario .row.mt-3");
    
        if (cardContainer.parent().is(contenedorPictogramas)) {
            let originalContainer = cardContainer.data("originalContainer");
            if (originalContainer && originalContainer.length) {
                let inserted = false;
                let index = parseInt(cardContainer.attr("data-index"));

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
                rowPictos.append(cardContainer);
            }
            cardContainer.find(".cross-icon").remove(); 
        } else {
            if (!cardContainer.data("originalContainer")) {
                cardContainer.data("originalContainer", cardContainer.parent());
                cardContainer.attr("data-index", cardContainer.index());
            }
            cardContainer.append('<span class="cross-icon">&times</span>'); 
            contenedorPictogramas.append(cardContainer);
        }
    });
    
})