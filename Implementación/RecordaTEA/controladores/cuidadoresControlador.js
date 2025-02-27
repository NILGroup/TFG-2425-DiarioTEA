const CuidadoresService = require('../servicios/cuidadoresService')
const cuidadoresService = new CuidadoresService();

class CuidadoresController{
    constructor(){}

    async login(req, res){
        if(req.session.logged === 0 || req.session.logged === undefined){
            const cuidador = await cuidadoresService.leerCuidadorId(1);
            req.session.logged = 1;
            req.session.nombre = cuidador.nombre;
        }
        res.render('diario');
    }
}

module.exports = CuidadoresController;