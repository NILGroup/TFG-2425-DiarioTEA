const TarjetasDao = require('../dao/tarjetasDao');
const axios = require('axios');

const tarjetasDao = new TarjetasDao();

class TarjetasService {
    constructor() {}

    async vocabularioUsuarioId(id_usuario) {

        let vocabulario;
        try {
            if (id_usuario !== null) {
                vocabulario = await tarjetasDao.vocabularioUsuarioId(id_usuario);
            }
            else{
                vocabulario = -1;
            }
            return vocabulario;
        }
        catch (error) {
            console.error('ERROR[TarjetasService]: obtener vocabulario por ID: ', error);
            throw error;
        }
    }

    async consultaArasaac(consulta){
        console.log('estoy arasaac')
        try{
            let response = await axios.get(`https://api.arasaac.org/api/pictograms/es/search/${consulta}`);
            console.log(response);
            return response;
        }
        catch(error){
            throw error;
        }
    }

    async pictosArasaac(id_picto){

    }
}

module.exports = TarjetasService;