$(document).ready(function(){
    let imgSeleccionadaAnt = null;

    $('#stepTarjetas').hide();

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
        $('#portadaImagen').attr('src', '/images/config/noPortada.png');
    });

    $('#cancelarPortada').on('click', function(){
        imgSeleccionadaAnt.removeClass('seleccionada');
    });

    $('#stepDos').on('click', function(e){
        e.preventDefault();
        $('#basicoRutina').fadeOut(function(){
            $('#stepTarjetas').fadeIn();
        });
    });

    $('#stepAnterior').on('click', function(e){
        e.preventDefault();
        $('#stepTarjetas').fadeOut(function(){
            $('#basicoRutina').fadeIn();
        });
    });

    $('#tarjetasRutinas').on('click', ".card",function(e){
        e.preventDefault();

        let cardContainer = $(this).closest(".col-lg-2, .col-md-3");
        $(this).append('<span class="cross-icon">&times</span>');
        $('#composiciónRutina').append(cardContainer);
    });

    $('#composiciónRutina').on('click', ".card",function(e){
        e.preventDefault();

        let cardContainer = $(this).closest(".col-lg-2, .col-md-3");
        cardContainer.find(".cross-icon").remove();
        $('#tarjetasRutinas').append(cardContainer);
    });


    $("#guardarRutina").on('click', function(e){
        e.preventDefault();

        const tarjetas=[];
         // Recorrer todas las cards dentro del contenedorRegistros
         $('#composiciónRutina .card').each(function (index) {
            const card = $(this); // Obtener la card actual
            const idTarjeta = parseInt(card.attr('id')); // Obtener el id de la tarjeta
            const orden = index + 1; // Obtener el orden (posición) de la tarjeta (empezando desde 1)

            
            tarjetas.push({
                id_tarjeta: idTarjeta, // Guardar el id de la tarjeta
                orden: orden   // Guardar el orden de la tarjeta
            });

            const rutina = {
                id_usuario: 1,
                nombre: $("#nombreRutina").val(),
                fecha_creacion: new Date(),
                tarjetas: tarjetas
            };

            $("#rutinaInput").val(JSON.stringify(rutina));

            $("#form-rutina").submit();
        });
    })
});