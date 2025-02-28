$(document).ready(function () {

    $('#buscaArasaac').on('click', function (e) {
        e.preventDefault();
        let consulta = $('#campoBusqueda').val();
        let contenedorPictos = $('#resultBusqueda');
        if (consulta === null || consulta === undefined || consulta === "") {
            alert('La consulta está vacía o no definida.');
        }
        else {
            console.log('ajax')
            $.ajax({
                url: '/tarjetas-comunicacion/arasaac',
                method: 'GET',
                data: {consulta: consulta},
                beforeSend: function() {
                    $('#matrizBusqueda').show();
                    $('#cargando').show();
                    contenedorPictos.hide().empty();
                    $('#avisos').find('span').remove();
                },
                success: function (data, status, xhr) {
                    if(data.length > 0){
                        data.forEach(picto => {
                            const divPicto = $('<div>').addClass('col-lg-2 col-md-3 mt-3 d-flex');
                            const card = $('<div>').addClass('card');
                            const enlace = $('<a>').attr('href', '').attr('id', picto.id);
                            const imagen = $('<img>').attr('src', picto.enlace).attr('alt', picto.consulta).addClass('card-img');
                            enlace.append(imagen);
                            card.append(enlace);
                            divPicto.append(card);
                            contenedorPictos.append(divPicto);
                        });
                    }
                    else{
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
})