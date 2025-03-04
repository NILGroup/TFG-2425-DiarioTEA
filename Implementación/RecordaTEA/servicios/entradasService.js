const TarjetasDao = require('../dao/tarjetasDao');
const EntradasDao = require('../dao/entradasDao');

const tarjetasDao = new TarjetasDao();
const entradasDao = new EntradasDao();

class EntradasService{
    constructor(){}

    async entradasMes(usuario){
        try{
            let data = await entradasDao.entradasMes(usuario);
            return data;
        }
        catch(error){
            console.error('ERROR[EntradasService]: obtener entradas de un mes: ', error);
            throw error;
        }
    }
}

module.exports = EntradasService;