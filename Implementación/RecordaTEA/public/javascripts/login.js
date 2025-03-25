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
                $("#acceder").prop("disabled", false);
                $('#passw-confirmacion').removeClass('is-invalid');
            }
            else {
                $("#acceder").prop("disabled", true);
                $("#error").text('Las contraseñas no coinciden');
                $('#passw-confirmacion').addClass('is-invalid');
            }
        }
    });

    $('#login').on('submit', function (e) {
        e.preventDefault();
        let usuario = $('#usuario');
        let passw = $('#passw');
        let confirm = $('#passw-confirmacion');
        let nombre = $('#nombre');
        let rol = $('#rol');
        let valido = true;

        let usuarioValor = usuario.val().trim();
        let passwValor = passw.val().trim();
        let confirmValor = confirm.val().trim();
        let nombreValor = nombre.val().trim();
        let rolValor = rol.val();

        usuario.removeClass('is-invalid');
        passw.removeClass('is-invalid');
        confirm.removeClass('is-invalid');
        nombre.removeClass('is-invalid');
        rol.removeClass('is-invalid');


        if (usuarioValor === '') {
            usuario.addClass('is-invalid');
            valido = false;
        }
        if (passwValor === '') {
            passw.addClass('is-invalid');
            valido = false;
        }

        if ($('#tit-pag').text() === 'Crear cuenta') {
            if (confirmValor === '') {
                confirm.addClass('is-invalid');
                $('#error').text('Campo obligatorio.')
                valido = false;
            }
            if (nombreValor === '') {
                nombre.addClass('is-invalid');
                valido = false;
            }
            if (rolValor === 'Seleccione una opción' || !rolValor) {
                rol.addClass('is-invalid');
                valido = false;
            }
        }

        if (valido) {
            if ($('#tit-pag').text() === 'Crear cuenta') {

            } else {
                let u = {
                    usuario: usuarioValor,
                    passw: passwValor
                };

                $.ajax({
                    url: '/users/login',
                    method: 'POST',
                    data: {
                        usuario: u
                    },
                    success: function(){
                        
                    },
                    error: function(){

                    }
                });
            }
        }
    })
});