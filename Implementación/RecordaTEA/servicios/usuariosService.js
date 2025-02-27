const UsuariosDao = require('../dao/usuariosDao')
const usuariosDao = new UsuariosDao();

class UsuariosService{
    constructor(){
    }

    async leerUsuarioId(id){
        try{
            const usuario = await usuariosDao.leerUsuarioId(id);
            return usuario;
        }
        catch(error){
        }
    }

    async leerUsuariosCuidador(idCuidador){
        try{
            const usuarios = await usuariosDao.leerUsuariosCuidador(idCuidador);
            return usuarios;
        }
        catch(error){
            
        }
    }
}

module.exports = UsuariosService;