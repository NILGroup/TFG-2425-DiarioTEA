const RutinasService = require('../servicios/rutinasService')
const rutinasServicio = new RutinasService();

class RutinasControlador {

    constructor(){}

    async getUserRutinas(req, res){
        const idUsuario = req.session.usuario.id;

        const response = await rutinasServicio.getRutinasById(idUsuario);

        res.render('rutinasTEA', {rutinas: response, diary: false})
    }

    async getCuidadoresRutinas(req, res){

        const response = await rutinasServicio.getRutinasById(1);

        res.render('rutinas', {rutinas: response, nombre: req.session.usuario.nombre})
    }

    async getTarjetasByIdRutina(req, res){

        const idRutina = req.params.idRutina;
        const response = await rutinasServicio.getTarjetasByIdRutina(idRutina);

        res.render('viewRutinaTEA', {rutinas: response, diary: false, nombre: response[0].nombre})
    }


}
module.exports = RutinasControlador;