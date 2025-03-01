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
        try{
            let response = await axios.get(`https://api.arasaac.org/api/pictograms/es/search/${consulta}`);
            return response.data;
        }
        catch(error){
            console.log('ERROR[TarjetasService]: obtener consulta de ARASAAC: ', error)
            throw error;
        }
    }

    async pictosArasaac(id_picto){
        try{
            let response = await axios.get(`https://api.arasaac.org/api/pictograms/${id_picto}?url=true&download=false`);
            return response.data;
        }
        catch(error){
            console.log('ERROR[TarjetasService]: obtener pictograma de ARASAAC: ', error)
            throw error;
        }
    }

    async addTarjetaVocabulario(id_arasaac, enlace){
        try{

        }
        catch (error){

        }
    }
}

module.exports = TarjetasService;