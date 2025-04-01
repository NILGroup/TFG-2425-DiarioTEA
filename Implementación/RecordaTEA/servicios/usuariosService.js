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