
$(document).ready(function () {

    var emocion = null;

    $('#editar-btn-edit').click(function () {
        $('#fecha-edit').removeAttr('readonly').removeClass('no-editable');;
        $('#hora-edit').removeAttr('readonly').removeClass('no-editable');
        $('#editar-btn-edit').hide();
        $('#cancel-btn-edit').show();
    });

    $('#cancel-btn-edit').click(function () {
        $('#fecha-edit').addClass('no-editable').prop("readonly", true);
        $('#hora-edit').addClass('no-editable').prop("readonly", true);
        $('#editar-btn-edit').show();
        $('#cancel-btn-edit').hide();
    });

    var emocionSeleccionadaAnt = null;

    $('#emocionModal .card').on('click', function (e) {
        e.preventDefault();
        if (emocionSeleccionadaAnt != null) {
            emocionSeleccionadaAnt.find('img').removeClass('seleccionada');
        }
        emocionSeleccionadaAnt = $(this);
        $(this).find('img').addClass('seleccionada');
    });

    $("#addEmocionButton").on('click', function(){
        var img= emocionSeleccionadaAnt.find('img').attr('src');
        $("#emocionSeleccionada").attr('src', img);
        $('#emocionModal').modal('hide');
     
    })

    $('#updateButton').on('click', function (e) {
        e.preventDefault();
        const tarjetas = []; // Array para almacenar los datos de las cards



        // Recorrer todas las cards dentro del contenedorRegistros
        $('#contenedorRegistros .card').each(function (index) {
            const card = $(this); // Obtener la card actual
            const idTarjeta = parseInt(card.attr('id')); // Obtener el id de la tarjeta
            const orden = index + 1; // Obtener el orden (posición) de la tarjeta (empezando desde 1)


            tarjetas.push({
                id: idTarjeta, // Guardar el id de la tarjeta
                orden: orden   // Guardar el orden de la tarjeta
               
            });
        });

        if(emocionSeleccionadaAnt!=null){
            emocion = emocionSeleccionadaAnt.find('img').attr('src');

        }


        const fecha = $('#fecha-edit').val(); // Ej: "2025-03-23"
        const hora = $('#hora-edit').val();   // Ej: "10:30"

        // Combinamos en string ISO y luego lo parseamos a Date
        const fechaHoraStr = `${fecha}T${hora}:00`; // "2025-03-23T10:30:00"
        const fechaHora = new Date(fechaHoraStr);

        // Formateamos como string para MySQL: "YYYY-MM-DD HH:MM:SS"
        const fechaHoraFormatted = fechaHora.toISOString().slice(0, 19).replace('T', ' ');

        // Para obtener el ID de la entrada
        const idEntrada = window.location.pathname.split('/').pop(); 

        const entrada = {
            fecha_registro: fechaHoraFormatted,
            tarjetas: tarjetas,
            id: idEntrada,
            emocion: emocion,
            tipo: "Picto",
            cuerpo: null
        };

        // Convertir el array a JSON y asignarlo al input del formulario
        $('#registrosEditadosInput').val(JSON.stringify(entrada));
        

        // Enviar el formulario
        $('#registrosFormEdit').submit();
    });










})