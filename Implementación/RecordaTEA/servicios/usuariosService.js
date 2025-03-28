const UsuariosDao = require('../dao/usuariosDao');
const bcrypt = require('bcrypt');

const usuariosDao = new UsuariosDao();



function formatDateTime(fechaRegistro) {
    const dateTime = new Date(fechaRegistro);

    // Formatear la fecha
    const optionsDate = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = dateTime.toLocaleDateString('es-ES', optionsDate);

    //numeric date para poder tenerla en el edit
    const numericDate = dateTime.toISOString().split("T")[0];

    // Formatear la hora
    const hours = dateTime.getUTCHours().toString().padStart(2, '0');
    const minutes = dateTime.getUTCMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;

    return { formattedDate, formattedTime, numericDate };
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

                const { formattedDate, formattedTime, numericDate } = formatDateTime(item.fecha_registro);


                const id = item.idEntrada;
                //si no está metido se crea
                if (!acc[id]) {
                    acc[id] = {
                        
                        idEntrada: id,
                        autor: item.autor,
                        fecha_registro: formattedDate,
                        hora_registro: formattedTime,
                        fecha_editable: numericDate,
                        cuerpo: item.cuerpo,
                        tarjetas: []
                    };
                }
                //para saber si es una entrada con pictos o solo texto del cuerpo
                if (item.id_tarjeta !== null) {
                    acc[id].tarjetas.push({
                        id_tarjeta: item.id_tarjeta,
                        orden: item.orden,
                        enlace: item.enlace,
                        emocion: item.emocion
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

    async submitEditEntry(data){
        const response = await usuariosDao.actualizarTarjetasEntrada(data);
        return response;
    }

    async login(usuario){
        let u = await usuariosDao.login(usuario);

        if (!u) {
            return {mensaje: -1};
        }

        console.log(usuario.password + '\n' + u.contraseña);

        const esValida = await bcrypt.compare(usuario.password, u.contraseña);
        if (!esValida) {
            return {mensaje: -2}
        }

        return {mensaje: u}
    }

    async registro(usuario){
        const hashedPassword = await bcrypt.hash(usuario.passw, 10);
        usuario.password = hashedPassword;
        
        let existeUsuario = await usuariosDao.leerUsuario(usuario.usuario);
        if(existeUsuario.length !== 0){
            return {mensaje: -3};
        }
        else{
            let registerResult = await usuariosDao.registrarUsuario(usuario);
            return {mensaje: registerResult.insertId};
        }
    }

    async realacionCuidador(usuarioId, cuidadorId){
        if(usuarioId > 0){
            let resultado = await usuariosDao.realcionCuidador(usuarioId, cuidadorId);
            return {mensaje: resultado.affectedRows};
        }else{
            return  {mensaje: -4};
        }
    }
}

module.exports = UsuariosService;