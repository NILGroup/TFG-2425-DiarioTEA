$(document).ready(function () {

    $(document).on('click', '#ver-passw-perfil', function (e) {
        e.preventDefault();
        if ($("#passw-perfil").attr("type") === "password") {
            $('#passw-perfil').attr('type', 'text');
            $(this).html('<i class="bi bi-eye-slash"></i>');
        }
        else {
            $('#passw-perfil').attr('type', 'password');
            $(this).html('<i class="bi bi-eye">');
        }
    });

    $('#passw-confirmacion-perfil, #passw-perfil').on('keyup', function (e) {
        let pass = $('#passw-perfil').val();
        let confirm = $('#passw-confirmacion-perfil').val();

        if (pass === confirm) {
            $("#add-perfil").prop("disabled", false);
            $('#passw-confirmacion-perfil').removeClass('is-invalid');
        }
        else {
            $("#add-perfil").prop("disabled", true);
            $("#error-perfil").text('Las contraseñas no coinciden');
            $('#passw-confirmacion-perfil').addClass('is-invalid');
        }
    });

    $('#mostrar-form').on('click', function (e) {
        e.preventDefault();
        $('#mostrar-perfiles').fadeOut().addClass('d-none');
        $('#container-form').fadeIn();
    });

    $('#add-perfil').on('click', function (e) {
        e.preventDefault();

        let usuario = $('#usuario-perfil');
        let passw = $('#passw-perfil');
        let confirm = $('#passw-confirmacion-perfil');
        let nombre = $('#nombre-perfil');
        let valido = true;

        let usuarioValor = usuario.val().trim();
        let passwValor = passw.val().trim();
        let confirmValor = confirm.val().trim();
        let nombreValor = nombre.val().trim();

        usuario.removeClass('is-invalid');
        passw.removeClass('is-invalid');
        confirm.removeClass('is-invalid');
        nombre.removeClass('is-invalid');


        if (usuarioValor === '') {
            usuario.addClass('is-invalid');
            $('#usuario-error-perfil').text('Campo obligatorio.');
            valido = false;
        }
        if (passwValor === '') {
            passw.addClass('is-invalid');
            $('#passw-error-perfil').text('Campo obligatorio.');
            valido = false;
        }
        if (confirmValor === '') {
            confirm.addClass('is-invalid');
            $('#error-perfil').text('Campo obligatorio.')
            valido = false;
        }
        if (nombreValor === '') {
            nombre.addClass('is-invalid');
            valido = false;
        }

        if (valido) {

            let perfil = {
                usuario: usuarioValor,
                passw: passwValor,
                nombre: nombreValor
            };

            $.ajax({
                url: '/users/nuevo-usuario',
                method: 'POST',
                data: perfil,
                success: function (response) {
                    console.log(response.usuario);
                    if (response.mensaje > 0) {
                        let usu = `
                <div class="col-md-3 col-xs-3">
                    <a href="/diario/${response.usuario.id}">
                        <div class="card card-usuarios">
                            <h5 class="card-title text-center">${response.usuario.nombre}</h5>
                            <div class="card-body"></div>
                        </div>
                    </a>
                </div>`;
                        $('#cards-usuarios').append(usu);
                        $('#aviso-boton').hide();
                        $('#container-form').fadeOut();
                        $('#mostrar-perfiles').removeClass('d-none').fadeIn();
                    }
                    else if (response.mensaje == -3) {
                        usuario.addClass('is-invalid');
                        $('#usuario-error-perfil').text('Usuario ya existente.');
                    }
                },
                error: function () {

                }
            });
        }
    });
});