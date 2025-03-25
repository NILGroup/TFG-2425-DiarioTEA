const CuidadoresDao = require('../dao/cuidadoresDao')
const bcrypt = require('bcrypt');

const cuidadoresDao = new CuidadoresDao();

class CuidadoresService{
    constructor(){}

    async leerCuidadorId(id){
        const cuidador = await cuidadoresDao.leerCuidadorId(id);
        return cuidador[0];
    }

    async registroCuidador(usuario){
        const hashedPassword = await bcrypt.hash(usuario.password, 10);
        usuario.password = hashedPassword;

        let cuidador = await cuidadoresDao.leerCuidadorUsuario(usuario.usuario);
        if(cuidador.usuario === usuario.usuario){
            return {existe: true};
        }
        else{
            let registro = await cuidadoresDao.registrarUsuario(usuario);
            return {existe: registro};
        }
    }
}

module.exports = CuidadoresService;