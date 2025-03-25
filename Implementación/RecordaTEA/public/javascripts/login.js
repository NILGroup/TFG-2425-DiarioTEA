$(document).ready(function () {

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

    $(document).on('click', '#cambio', function (e) {
        e.preventDefault();
        $('#registro').slideDown();
        $('#texto-cambio').html('Puede iniciar sesión pulsando <a href="#" id="cambio-login">aquí</a>.');
        $('#acceder').text('Registrarse');
        $('#tit-pag').text('Crear cuenta');
    });

    $(document).on('click', '#cambio-login', function (e) {
        e.preventDefault();
        $('#registro').slideUp();
        $('#texto-cambio').html('Puede crear una cuenta pulsando <a href="#" id="cambio">aquí</a>.');
        $('#acceder').text('Acceder');
        $('#tit-pag').text('Iniciar sesión');
        $("#acceder").prop("disabled", false);
        $('#passw-confirmacion').val('');
    });

    $(document).on('click', '#ver-passw', function (e) {
        e.preventDefault();
        if ($("#passw").attr("type") === "password") {
            $('#passw').attr('type', 'text');
            $(this).html('<i class="bi bi-eye-slash"></i>');
        }
        else {
            $('#passw').attr('type', 'password');
            $(this).html('<i class="bi bi-eye">');
        }
    });

    $('#passw-confirmacion, #passw').on('keyup', function (e) {
        if ($('#tit-pag').text() === 'Crear cuenta') {
            let pass = $('#passw').val();
            let confirm = $('#passw-confirmacion').val();

            if (pass === confirm) {
                $("#error").hide();
                $("#acceder").prop("disabled", false);
            }
            else {
                $("#acceder").prop("disabled", true);
                $("#error").show();
            }
        }
    });
});