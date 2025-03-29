$(document).ready(function () {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

    $('#label-permisoTextoLibre').on('click', function (e) {
        e.preventDefault();
    });

    $('#permisoTextoLibre').on('change', function () {
        let alerta = $('<div>').addClass('alert alert-light alert-custom').attr('role', 'alert');
        let mensaje;
        var persiste = true;
        var cambio;

        if ($(this).prop('checked')) {
            mensaje = 'Se ha activado el texto libre.'
            cambio = true;
        } else {
            mensaje = 'Se ha desactivado el texto libre.'
            cambio = false;
        }
        let deshacer = $('<button>').addClass('btn btn-sm btn-deshacer').attr('id', 'deshacer-texto').text('Deshacer');
        alerta.append(mensaje, deshacer).hide();
        $('#avisosPictos').append(alerta);
        alerta.fadeIn();

        let temp = setTimeout(function () {
            alerta.fadeOut(function () {
                alerta.remove();
            });
            if (persiste) {
                $.ajax({
                    url: '/tarjetas-comunicacion/cambiar-texto-libre',
                    method: 'PUT',
                    data: {
                        texto: cambio
                    },
                    success: function (data, status, xhr) {
                        if (data.success) {

                        }
                    },
                    error: function (data, status, xhr) {

                    }
                });
            }
        }, 5000);

        deshacer.on('click', function (e) {
            e.preventDefault();
            persiste = false;
            clearTimeout(temp);
            alerta.fadeOut();
            console.log(cambio);
            $('#permisoTextoLibre').prop('checked', !cambio);
        });
    });
});
