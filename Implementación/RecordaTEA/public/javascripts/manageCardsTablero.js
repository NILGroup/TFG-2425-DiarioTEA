$(document).ready(function () {
    var pagina = 1;
    var consulta = "";
    var ultPag;

    $('#buscaArasaac').on('click', function (e) {
        e.preventDefault();
        consulta = $('#campoBusqueda').val();
        pagina = 1;
        let contenedorPictos = $('#resultBusqueda');
        let cont = $('<div>').attr('id', 'page-1').addClass('row');
        if (consulta === null || consulta === undefined || consulta === "") {
            alert('La consulta está vacía o no definida.');
        }
        else {
            $('#paginas').hide();
            $.ajax({
                url: '/tarjetas-comunicacion/arasaac',
                method: 'GET',
                data: { consulta: consulta },
                beforeSend: function () {
                    $('#matrizBusqueda').show();
                    $('#cargando').show();
                    contenedorPictos.hide().empty();
                    $('#avisos').find('span').remove();
                },
                success: function (data, status, xhr) {
                    if (data.pictos.length > 0) {
                        data.pictos.forEach(picto => {
                            const divPicto = $('<div>').addClass('col-lg-2 col-md-3 mt-3 d-flex');
                            const card = $('<div>').addClass('card').addClass('gestion');
                            const enlace = $('<a>').attr('href', '');
                            const imagen = $('<img>').attr('src', picto.enlace).attr('alt', consulta).addClass('card-img');
                            const fondo = $('<div>').addClass('add-picto');
                            const mas = $('<span>').attr('id', picto.id_arasaac).attr('data-enlace', picto.enlace).addClass('mas').text('+');
                            enlace.append(imagen);
                            card.append(enlace, fondo, mas);
                            divPicto.append(card);
                            cont.append(divPicto);
                        });
                        contenedorPictos.append(cont);
                        if (data.paginacion >= 17) {
                            $('#paginas').show();
                            $('#anteriorPag').prop('disabled', true);
                            $('#siguientePag').prop('disabled', false);
                        }
                    }
                    else {
                        const sp = $('<span>').text('No se encontraron pictogramas que coincidan con su búsqueda.').addClass('aviso');
                        $('#avisos').append(sp);
                    }
                    $('#cargando').hide();
                    contenedorPictos.show();
                },
                error: function (xhr, status, error) {

                }
            });
        }
    });

    $('#siguientePag').on('click', function (e) {
        e.preventDefault();
        $(`#page-${(pagina)}`).hide();
        pagina += 1;
        if (document.getElementById(`page-${(pagina)}`)) {
            $(`#page-${(pagina)}`).show();
            $('#anteriorPag').prop('disabled', false);
            if (ultPag !== undefined && ultPag === pagina) {
                $('#siguientePag').prop('disabled', true);
            }
        }
        else {
            let cont = $('<div>').attr('id', `page-${pagina}`).addClass('row');
            let contenedorPictos = $('#resultBusqueda');
            $.ajax({
                url: '/tarjetas-comunicacion/pagina',
                method: 'GET',
                data: { pagina: pagina },
                beforeSend: function () {
                    $('#cargando').show();
                },
                success: function (data, status, xhr) {
                    if (data.pictos.length > 0) {
                        data.pictos.forEach(picto => {
                            const divPicto = $('<div>').addClass('col-lg-2 col-md-3 mt-3 d-flex');
                            const card = $('<div>').addClass('card').addClass('gestion');
                            const enlace = $('<a>').attr('href', '');
                            const imagen = $('<img>').attr('src', picto.enlace).attr('alt', consulta).addClass('card-img');
                            const fondo = $('<div>').addClass('add-picto');
                            const mas = $('<span>').attr('id', picto.id_arasaac).attr('data-enlace', picto.enlace).addClass('mas').text('+');
                            enlace.append(imagen);
                            card.append(enlace, fondo, mas);
                            divPicto.append(card);
                            cont.append(divPicto);
                        });
                        if (data.paginacion < 17) {
                            ultPag = pagina;
                            $('#siguientePag').prop('disabled', true);
                        }
                        $('#cargando').hide();
                        $('#anteriorPag').prop('disabled', false);
                        contenedorPictos.append(cont);
                    }
                }
            });
        }
    });

    $('#anteriorPag').on('click', function (e) {
        e.preventDefault();
        $(`#page-${(pagina)}`).hide();
        pagina -= 1;
        $(`#page-${(pagina)}`).show();
        if (pagina === 1) {
            $('#anteriorPag').prop('disabled', true);
        }
        if ($('#siguientePag').prop('disabled')) {
            $('#siguientePag').prop('disabled', false);
        }
    });

    $('#resultBusqueda').on('click', '.mas', function (e) {
        e.preventDefault();
        let id = $(this).attr('id');
        let enlace = $(this).attr('data-enlace');
        let divPicto = $(this).closest('.col-lg-2.col-md-3.mt-3.d-flex');
        let carta = $(this).closest('.card.gestion');
        let copia = carta.clone(true);
        let alerta = $('<div>').addClass('alert alert-light alert-custom').attr('role', 'alert');
        $.ajax({
            url: '/tarjetas-comunicacion/picto-vocabulario',
            method: 'POST',
            data: {
                id_arasaac: id,
                enlace: enlace
            },
            success: function (data, status, xhr) {
                if (data.success) {
                    //Contruir la papelera y eliminar el +
                    copia.find(`#${data.id_arasaac}`).remove();
                    copia.find('.add-picto').remove();
                    let hov = $('<div>').addClass('remove-picto');
                    let basura = $('<span>').attr('id', data.id).addClass('trash').html('<i class="bi bi-trash3-fill"></i>');
                    copia.append(hov, basura);
                    let div = divPicto.clone(true);
                    div.empty().removeClass('d-flex');
                    let d = $('<div>').addClass('d-flex');
                    div.append(d).append(copia);

                    //Añadirlo al contenedor del vocabulario
                    $('#contenedorPictogramas').prepend(div);

                    // Eliminar texto de no pictos (si lo hubiese)
                    $('#no-pictos').hide();
                    $('#no-pictos span').hide();


                    //Mostrar el aviso de cambios guardados
                    alerta.text('Cambios guardados').attr('id', `alert-${data.id}`).hide();
                    $('#avisosPictos').append(alerta);
                    $(`#alert-${data.id}`).fadeIn();
                    setTimeout(function () {
                        $(`#alert-${data.id}`).fadeOut().remove();
                    }, 2000);
                }
                else {

                }
            },
            error: function (xhr, status, error) {

            }
        });
    });

    $('#contenedorPictogramas').on('click', '.trash', function (e) {
        e.preventDefault();
        //Obtenemos los datos
        let id = $(this).attr('id');
        let divPicto = $(this).closest('.col-lg-2.col-md-3.mt-3');
        let card = $(this).closest('.card');
        let persiste = true;

        //Escondemos el picto como si estuviese eliminado
        divPicto.hide();

        //Avisamos de que ha eliminaod un picto y que lo puede deshacer
        let alerta = $('<div>').addClass('alert alert-light alert-custom').attr('role', 'alert');
        let mensaje = $('<span>').text('Se ha eliminado el pictograma');
        let deshacer = $('<button>').addClass('btn btn-sm btn-deshacer').attr('id', 'deshacer-elim').text('Deshacer');
        alerta.append(mensaje, deshacer).hide();
        $('#avisosPictos').append(alerta);
        alerta.fadeIn();
        let temp = setTimeout(function () {
            alerta.fadeOut(function(){
                alerta.remove();
            });
            if(persiste){
            $.ajax({
                url: '/tarjetas-comunicacion/eliminar-picto',
                method: 'DELETE',
                data: {
                    id: id
                },
                success: function (data, status, xhr) {
                    if(data.success){
                        $(`#${id}`).closest('.col-lg-2.col-md-3.mt-3').remove();
                    }
                },
                error: function (data, status, xhr) {
    
                }
            }); 
        }
        }, 5000);

        deshacer.on('click', function(e){
            e.preventDefault();
            persiste = false;
            clearTimeout(temp); 
            alerta.fadeOut();
            divPicto.show();
        });
    });
})