const RutinasService = require('../servicios/rutinasService')
const rutinasServicio = new RutinasService();
const TarjetasService = require('../servicios/tarjetasService');
const tarjetasService = new TarjetasService();

class RutinasControlador {

    constructor(){}

    async getUserRutinas(req, res){
        const idUsuario = req.session.usuario.id;

        const response = await rutinasServicio.getRutinasById(idUsuario);

        res.render('TEA/rutinasTEA', {rutinas: response, diary: false, usuario: req.session.usuario.nombre, config: req.session.config})
    }

    async getCuidadoresRutinas(req, res){

        const response = await rutinasServicio.getRutinasById(req.session.usuario.id);

        let data = {
            rutinas: response, 
            nombreUsuario: req.session.usuario.nombre, 
            idUsuario: req.session.usuario.id, 
            usuarios: req.session.usuarios,
            config: req.session.config
        }
        
        res.render('cuidadores/rutinas', {data: data});
        
    }

    async getTarjetasByIdRutina(req, res){

        const idRutina = req.params.idRutina;
        const response = await rutinasServicio.getTarjetasByIdRutina(idRutina);

        res.render('TEA/viewRutinaTEA', {rutinas: response, diary: false, nombreRutina: response[0].nombre, usuario: req.session.usuario.nombre, config:req.session.config})
    }

    async getTarjetasByIdRutinaCuidador(req, res){

        const idRutina = req.params.idRutina;
        const response = await rutinasServicio.getTarjetasByIdRutina(idRutina);

        let data = {
            rutinas: response, 
            nombreUsuario: req.session.usuario.nombre, 
            idUsuario: req.session.usuario.id, 
            usuarios: req.session.usuarios,
            config: req.session.config
        }
        console.log(data);

        res.render('cuidadores/viewRutina', {data:data})
    }

    async addRutina(req, res){
        //let id_usuario = req.session.usuario.id;
        let vocabulario = await tarjetasService.obtenerTarjetasUsuarioId(req.session.usuario.id);

        let data = {
            vocabulario: vocabulario, 
            nombreUsuario: req.session.usuario.nombre, 
            idUsuario: req.session.usuario.id, 
            usuarios: req.session.usuarios,
            config: req.session.config 
        }
        
        res.render('cuidadores/crearRutina', { data: data});
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