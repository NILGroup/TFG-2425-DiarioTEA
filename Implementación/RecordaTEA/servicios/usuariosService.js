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
}

module.exports = UsuariosService;