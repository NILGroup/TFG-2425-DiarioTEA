const RutinasService = require('../servicios/rutinasService')
const rutinasServicio = new RutinasService();
const TarjetasService = require('../servicios/tarjetasService');
const tarjetasService = new TarjetasService();

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

    async getTarjetasByIdRutinaCuidador(req, res){

        const idRutina = req.params.idRutina;
        const response = await rutinasServicio.getTarjetasByIdRutina(idRutina);

        res.render('viewRutina', {rutinas: response, nombre: response[0].nombre})
    }

    async addRutina(req, res){
        //let id_usuario = req.session.usuario.id;
        let vocabulario = await tarjetasService.vocabularioUsuarioId(1);
        
        res.render('crearRutina', { vocabulario: vocabulario, nombre: req.session.usuario.nombre });
    }

    async submitRutina(req, res){
        
        const tarjetasRutina = req.body.rutina;
        const rutina = JSON.parse(tarjetasRutina);
        rutina.autor = req.session.idUsuario;
       

        const response = await rutinasServicio.crearRutina(rutina);

        if(response.success){
            res.redirect("/rutinas");
        }
        else{
            res.render('error',{error: response})
        }
    }
     


}
module.exports = RutinasControlador;