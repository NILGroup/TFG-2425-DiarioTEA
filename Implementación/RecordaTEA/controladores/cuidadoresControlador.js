const CuidadoresService = require('../servicios/cuidadoresService');
const UsuariosService = require('../servicios/usuariosService');

const cuidadoresService = new CuidadoresService();
const usuariosService = new UsuariosService();

class CuidadoresController{
    constructor(){}

    async login(req, res){
        let cuidador = null;
        cuidador = await cuidadoresService.leerCuidadorId(2);
        const usuarios = await usuariosService.leerUsuariosCuidador(cuidador.id);
        req.session.logged = 1;
        req.session.nombre = cuidador.nombre;
        req.session.idUsuario =cuidador.id;
        req.session.usuario = usuarios[0];
        res.redirect('/diario');
    }
}

module.exports = CuidadoresController;