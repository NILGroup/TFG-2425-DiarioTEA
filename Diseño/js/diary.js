$(document).ready(function(){

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
});