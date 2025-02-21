$(document).ready(function(){

    ajustarAlturas();
    $('#consultaDia').hide();

    $('#btnConsultarDía').on('click', function(){
        $('#consultaDiario').fadeOut(function(){
            $('#consultaDia').fadeIn();
        });
    });

    $('#consultaMes').on('click', function(){
        $('#consultaDia').fadeOut(function(){
            $('#consultaDiario').fadeIn();
        });
    });

    $('#consultaDia2').on('click', function(event){
        event.preventDefault();
        $('#consultaDiario').fadeOut(function(){
            $('#consultaDia').fadeIn();
        });
    });


    $(".ir-detalle").on('click', function(e){
        //e.preventDefault();
        //var card = $(this).closest(".tarjeta-diario");
        window.location.href="viewEntry.html";
    })

    function ajustarAlturas() {
        let maxHeight = Math.max($(".list-dia").outerHeight(), $(".list-contenido").outerHeight(), $(".list-hora").outerHeight());
        $(".list-dia, .list-contenido, .list-hora").height(maxHeight);
    }

});