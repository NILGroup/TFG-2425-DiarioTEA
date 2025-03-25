const CuidadoresDao = require('../dao/cuidadoresDao')
const bcrypt = require('bcrypt');

const cuidadoresDao = new CuidadoresDao();

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
}

module.exports = CuidadoresService;