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
                            const enlace = $('<a>').attr('href', '').attr('id', picto.id_arasaac);
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
        $.ajax({
            url: '/tarjetas-comunicacion/picto-vocabulario',
            method: 'POST',
            data: {
                id_arasaac: id,
                enlace: enlace
            },
            success: function(data, status, xhr){

            },
            error: function(xhr, status, error){
                
            }
        });
    });
})