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

    async addTarjetaVocabulario(id_arasaac, enlace, id_usuario){
        try{
            let existe = await tarjetasDao.comprobarExistenciaPicto(id_arasaac, enlace, id_usuario);
            if(existe.length > 0){
                return {success: false, id: 0, id_arasaac: id_arasaac};
            }
            else{
                let insertado = await tarjetasDao.addTarjetaVocabulario(id_arasaac, enlace, id_usuario);
                return {success: true, id: insertado, id_arasaac: id_arasaac};
            }
        }
        catch (error){
            console.log('ERROR[TarjetasService]: añadir pictograma al vocabulario: ', error)
            throw error;
        }
    }
}

module.exports = TarjetasService;