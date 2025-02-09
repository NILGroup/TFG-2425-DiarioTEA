
$(document).ready(function () {

    //escondidos por defecto
    $("#columnaGuardarDiario").hide();
    $("#columnaFormDiario").hide();



    $("#addRegistro").on('click', function () {
        $("#columnaGuardarDiario").show();
        $("#columnaFormDiario").show();
        $("#columnaAddDiario").hide();
        $("#columnaVistaDiario").hide();

        // Obtener la fecha actual en formato ISO (AAAA-MM-DD)
        var fecha = new Date().toISOString().split('T')[0];
        // Obtener la hora actual en formato de 24 horas (HH:MM)
        var hora = new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });

        // Asignar la fecha y hora a los campos del formulario
        $('#fecha').val(fecha);
        $('#hora').val(hora);
    });

    $("#asociarRutina").on('change', function () {
        if ($('#asociarRutina').is(':checked')) {
            $('#selectRutinaContainer').append(`
                <div class="form-group mt-3" id="selectRutinaGroup">
                    <label for="rutina">Seleccionar rutina</label>
                    <select class="form-control" id="rutina" name="rutina">
                        <option value="rutina1">Colegio</option>
                        <option value="rutina2">Casa</option>
                    </select>
                </div>
            `);
        } else {
            $('#selectRutinaGroup').remove();
        }
    })

    

    $("#columnaFormDiario .card").each(function(index) {
        $(this).attr("data-index", index); // Guarda el índice original
        $(this).data("originalContainer", $(this).parent()); // Guarda el contenedor original
    });

    $(".container.d-flex").on("click", ".card", function() {
        let card = $(this);
        let contenedorPictogramas = $("#contenedorPictogramas");

        if (card.parent().is(contenedorPictogramas)) {
            // Volver al contenedor original y restaurar el orden
            let originalContainer = card.data("originalContainer");
            let index = card.attr("data-index");

            let inserted = false;
            originalContainer.children(".card").each(function() {
                if (parseInt($(this).attr("data-index")) > index) {
                    $(this).before(card);
                    inserted = true;
                    return false; // Salir del bucle
                }
            });

            // Si no se insertó antes de otro, agregar al final
            if (!inserted) {
                originalContainer.append(card);
            }
            card.find(".cross-icon").remove();

        } else {
            // Mover al contenedor de pictogramas
            contenedorPictogramas.append(card);
            card.append('<span class="cross-icon">✖</span>');
            
        }
    });




});

