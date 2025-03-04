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
            console.log('ERROR[TarjetasService]: añadir pictograma al vocabulario: ', error);
            throw error;
        }
    }

    async eliminarTarjetaVocabulario(idTarjeta){
        try{
            let recurso = await tarjetasDao.buscarPictoIdTarjeta(idTarjeta);
            console.log(recurso);
            let eliminar = await tarjetasDao.eliminarTarjetaVocabulario(idTarjeta, recurso[0].id);
            let elim = true;
            if(eliminar > 0){
                elim = true;
            }
            else{
                elim = false;
            }
            return {success: elim};
        }
        catch (error){
            console.log('ERROR[TarjetasService]: eliminar tarjeta vocabulario: ', error);
            throw error;
        }
    }

    async tarjetasEntrada(id_entrada){
        try{
            let pictos = tarjetasDao.tarjetasEntrada(id_entrada);
            return pictos;
        }
        catch (error){
            console.log('ERROR[TarjetasService]: buscar tarjetas de una entrada: ', error);
            throw error;
        }
    }
}

module.exports = TarjetasService;