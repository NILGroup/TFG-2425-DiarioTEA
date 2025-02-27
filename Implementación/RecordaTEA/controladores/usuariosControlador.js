const UsuariosService = require('../servicios/usuariosService')
const usuariosServicio = new UsuariosService();

class UsuariosContorlador{
    constructor(){}
    
    async leerUsuarioId(req, res){
        const r = await usuariosServicio.leerUsuarioId(1);
        res.send(r);
    }
}

module.exports = UsuariosContorlador;