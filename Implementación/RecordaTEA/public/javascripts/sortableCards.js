$(document).ready(function () {
    
    $('#contenedorPictogramas, #cardsRutina, #contenedorRegistros').sortable({
        // Define los elementos que serán "draggeables"
        items: '.col-lg-2',
        animation: 200,
        ghostClass: 'ghost'
    });

   
})