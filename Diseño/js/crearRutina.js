$(document).ready(function(){
    let imgSeleccionadaAnt = null;

    $('#portadaModal img').on('click', function(e){
        e.preventDefault();
        if(imgSeleccionadaAnt != null){
            imgSeleccionadaAnt.removeClass('seleccionada');
        }
        imgSeleccionadaAnt =  $(this);
        $(this).addClass('seleccionada');
    });

    $('#seleccionarPortada').on('click', function(){
        if(imgSeleccionadaAnt != null){
            let imgSeleccionada = imgSeleccionadaAnt.attr('src');
            $('#portadaImagen').attr('src', imgSeleccionada);
        }
        $("#portadaModal").modal("hide");
    });

    $('#eliminarPortada').on('click', function(e){
        e.preventDefault();
        imgSeleccionadaAnt.removeClass('seleccionada');
        $('#portadaImagen').attr('src', 'images/config/noPortada.png');
    });

    $('#cancelarPortada').on('click', function(){
        imgSeleccionadaAnt.removeClass('seleccionada');
    });
});