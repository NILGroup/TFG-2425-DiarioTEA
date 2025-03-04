const TarjetasDao = require('../dao/tarjetasDao');
const EntradasDao = require('../dao/entradasDao');

const tarjetasDao = new TarjetasDao();
const entradasDao = new EntradasDao();

class EntradasService{
    constructor(){}

    async entradasMes(usuario){
        try{
            let entradasMes = await entradasDao.entradasMes(usuario);
            return entradasMes;
        }
        catch(error){
            console.error('ERROR[EntradasService]: obtener entradas de un mes: ', error);
            throw error;
        }
    }

    async entradasDia(fecha, usuario){
        try{
            let entradasDia = await entradasDao.entradaDia(fecha, usuario);
            return entradasDia;
        }
        catch(error){
            console.error('ERROR[EntradasService]: obtener entradas de un mes: ', error);
            throw error;
        }
    }
}

module.exports = EntradasService;