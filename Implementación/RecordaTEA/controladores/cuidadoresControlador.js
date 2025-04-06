const CuidadoresService = require('../servicios/cuidadoresService');
const UsuariosService = require('../servicios/usuariosService');

const cuidadoresService = new CuidadoresService();
const usuariosService = new UsuariosService();

class CuidadoresController {
    constructor() { }

    async inicio(req, res) {
        if(req.session.logged && req.session.cuidador){
            const usuarios = await usuariosService.leerUsuariosCuidador(req.session.idUsuario);
            req.session.usuarios = usuarios;
            let nombre = req.session.nombre;
            res.render('cuidadores/index.ejs', { data: {usuarios, nombre} });
        }
    }
    
    async registro(req, res) {
        let u = {
            usuario: req.body.usuario,
            passw: req.body.passw,
            rol: req.body.rol,
            nombre: req.body.nombre
        }

        let resultRegister = await usuariosService.registro(u, null);
        if (resultRegister.mensaje > 0) {
            u.id = resultRegister.mensaje;
            const resultado = await cuidadoresService.registroCuidador(u);
            if (resultado.mensaje.affectedRows == 1) {
                req.session.logged = 1;
                req.session.nombre = u.nombre;
                req.session.idUsuario = u.id;
                req.session.rol = u.rol;
                req.session.cuidador = 1;
                res.send({ mensaje: 1 });
            }
        }
        else {
            res.send({ mensaje: resultRegister.mensaje });
        }
    }

    logout(req, res){
        req.session.destroy();
        res.redirect('/');
    }

    async compartirPerfil(req, res){
        let resultado = await cuidadoresService.compartirPerfil(req.body.usuario, req.body.idPerfil);
        res.send(resultado);
    }

}

module.exports = CuidadoresController;