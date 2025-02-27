const CuidadoresService = require('../servicios/cuidadoresService');
const UsuariosService = require('../servicios/usuariosService');

const cuidadoresService = new CuidadoresService();
const usuariosService = new UsuariosService();

class CuidadoresController{
    constructor(){}

    async login(req, res){
        let cuidador = null;
        cuidador = await cuidadoresService.leerCuidadorId(1);
        if(req.session.logged === 0 || req.session.logged === undefined){
            req.session.logged = 1;
            req.session.nombre = cuidador.nombre;
        }
        const usuarios = await usuariosService.leerUsuariosCuidador(cuidador.id);
        console.log(usuarios[0])
        res.render('diario', { usuarios: usuarios });
    }
}

module.exports = CuidadoresController;