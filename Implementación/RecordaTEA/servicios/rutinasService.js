const RutinasDao = require('../dao/rutinasDao')
const rutinasDao = new RutinasDao();

class RutinasService{
    constructor(){}

    async leerRutina(id){
        const rutina = await rutinasDao.leerRutina(id);
        return rutina[0];
    }

    async getRutinasById(idUsuario){
        const response = await rutinasDao.getRutinasById(idUsuario);
        return response[0];
    }

    async getTarjetasByIdRutina(idRutina){
        const response = await rutinasDao.getTarjetasByIdRutina(idRutina);
        return response[0];
    }

    async crearRutina(data){
        const response = await rutinasDao.crearRutina(data);
        return response;
    }
}

module.exports = RutinasService;