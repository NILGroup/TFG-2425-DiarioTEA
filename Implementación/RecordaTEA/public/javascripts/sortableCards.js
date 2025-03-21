$(document).ready(function () {
    
    $('#contenedorPictogramas, #cardsRutina').sortable({
        // Define los elementos que serán "draggeables"
        items: '.col-lg-2',
        animation: 200,
        ghostClass: 'ghost'
    });

})