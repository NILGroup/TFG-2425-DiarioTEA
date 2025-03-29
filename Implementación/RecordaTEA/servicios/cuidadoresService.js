const CuidadoresDao = require('../dao/cuidadoresDao')
const UsuariosDao = require('../dao/usuariosDao');
const bcrypt = require('bcrypt');

const cuidadoresDao = new CuidadoresDao();
const usuariosDao = new UsuariosDao();

class CuidadoresService {
    constructor() { }

    async leerCuidadorId(id) {
        const cuidador = await cuidadoresDao.leerCuidadorId(id);
        return cuidador[0];
    }

    async registroCuidador(usuario) {
        let cuidador = await cuidadoresDao.registro(usuario);
        return { mensaje: cuidador };
    }

    async login(usuario) {
        let u = await cuidadoresDao.login(usuario);
        return u;
    }

    async compartirPerfil(usuario, idPerfil){
        if(idPerfil > 0){
            let existe = await usuariosDao.leerUsuario(usuario);
            if(existe.length > 0){
                let hayRelacion = await cuidadoresDao.perfilVinculadoId(existe[0].id, idPerfil);
                if(hayRelacion.length > 0){
                    return {mensaje: -9};
                }
                else{
                    let msj = await cuidadoresDao.compartirPerfil(existe[0].id, idPerfil);
                    return {mensaje: msj};
                }
            }
            else{
                return {mensaje: -1};
            }
        }
        else{
            return {mensaje: -8};
        }
    }

}

module.exports = CuidadoresService;