const CuidadoresDao = require('../dao/cuidadoresDao')
const cuidadoresDao = new CuidadoresDao();

class CuidadoresService{
    constructor(){}

    async leerCuidadorId(id){
        const cuidador = await cuidadoresDao.leerCuidadorId(id);
        return cuidador[0];
    }
}

module.exports = CuidadoresService;