const UsuariosDao = require('../dao/usuariosDao')
const usuariosDao = new UsuariosDao();



function formatDateTime(fechaRegistro) {
    const dateTime = new Date(fechaRegistro);

    // Formatear la fecha
    const optionsDate = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = dateTime.toLocaleDateString('es-ES', optionsDate);

    // Formatear la hora
    const hours = dateTime.getUTCHours().toString().padStart(2, '0');
    const minutes = dateTime.getUTCMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;

    return { formattedDate, formattedTime };
}
class UsuariosService {
    constructor() {
    }

    async leerUsuarioId(id) {
        try {
            const usuario = await usuariosDao.leerUsuarioId(id);
            return usuario;
        }
        catch (error) {
        }
    }

    async leerUsuariosCuidador(idCuidador) {
        try {
            const usuarios = await usuariosDao.leerUsuariosCuidador(idCuidador);
            return usuarios;
        }
        catch (error) {

        }
    }



    async leerDiarioPorUsuario(idUsuario) {
        try {
            const entradas = await usuariosDao.leerDiarioPorUsuario(idUsuario);
    
            // Agrupa los datos en un array para mantener el orden
            const groupedData = [];
            const entryMap = new Map(); // Usamos un Map para hacer referencia rápida por idEntrada
    
            entradas[0].forEach((item) => {
                const { formattedDate, formattedTime } = formatDateTime(item.fecha_registro);
    
                const id = item.idEntrada;
    
                // Si la entrada aún no existe en el Map, la creamos
                if (!entryMap.has(id)) {
                    const newEntry = {
                        idEntrada: id,
                        autor: item.autor,
                        fecha_registro: formattedDate,
                        hora_registro: formattedTime,
                        cuerpo: item.cuerpo,
                        tarjetas: []
                    };
                    groupedData.push(newEntry); // Mantenemos el orden al agregar en el array
                    entryMap.set(id, newEntry);
                }
    
                // Añadimos la tarjeta si existe
                if (item.id_tarjeta !== null) {
                    entryMap.get(id).tarjetas.push({
                        id_tarjeta: item.id_tarjeta,
                        orden: item.orden,
                        enlace: item.enlace
                    });
                }
            });
    
            console.log(groupedData);
    
            return groupedData;
        } catch (error) {
            console.error(error);
        }
    }
    

    async obtenerTarjetasPorUsuario(idUsuario) {
        const response = await usuariosDao.obtenerTarjetasPorUsuario(idUsuario);

        return response[0];
    }

    async viewEntryById(idEntrada, idUsuario) {
        const response = await usuariosDao.viewEntryById(idEntrada, idUsuario);

        try {
            //para poder agrupar los datos por entrada
            const groupedData = response[0].reduce((acc, item) => {
                //basicamente itero con item sobre entradas, y voy metiendo en acc los datos para luego retornarlos en groupedData

                const { formattedDate, formattedTime } = formatDateTime(item.fecha_registro);


                const id = item.idEntrada;
                //si no está metido se crea
                if (!acc[id]) {
                    acc[id] = {
                        
                        idEntrada: id,
                        autor: item.autor,
                        fecha_registro: formattedDate,
                        hora_registro: formattedTime,
                        cuerpo: item.cuerpo,
                        tarjetas: []
                    };
                }
                //para saber si es una entrada con pictos o solo texto del cuerpo
                if (item.id_tarjeta !== null) {
                    acc[id].tarjetas.push({
                        id_tarjeta: item.id_tarjeta,
                        orden: item.orden,
                        enlace: item.enlace
                    });
                }

                return acc;
            }, {});

            const result = Object.values(groupedData);

            console.log(result);

            return result;
        }catch(error){

        }
    }

    async submitEntry(data){
        const response = await usuariosDao.submitEntry(data);
        return response;
    }

}

module.exports = UsuariosService;