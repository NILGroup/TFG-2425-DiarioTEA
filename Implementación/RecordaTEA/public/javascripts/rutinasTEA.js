$(document).ready(function () {



    $("#contenedorRutina").hide();

    $(".card").on('click', function (e) {
        e.preventDefault();
        $('#conjuntoRutinas').fadeOut(function () {
            $('#contenedorRutina').fadeIn();
        });
    })

    $(".card").on('click', function (e) {
        e.preventDefault();
        $('#conjuntoRutinas').fadeOut(function () {
            $('#contenedorRutina').fadeIn();
        });
    })

    $("#botonVolverRutinas").on('click', function(e){
        e.preventDefault();
        $('#contenedorRutina').fadeOut(function () {
            $('#conjuntoRutinas').fadeIn();
        });
    })

    $("#botonIniciarRutina").on('click', function(){
        window.location.href="iniciarRutinaTEA.html";
    })

    



})