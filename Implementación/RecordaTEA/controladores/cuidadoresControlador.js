const CuidadoresService = require('../servicios/cuidadoresService');
const UsuariosService = require('../servicios/usuariosService');

const cuidadoresService = new CuidadoresService();
const usuariosService = new UsuariosService();

class CuidadoresController {
    constructor() { }

    async inicio(req, res) {
        try{
            if(req.session.logged && req.session.cuidador){
                const usuarios = await usuariosService.leerUsuariosCuidador(req.session.idUsuario);
                req.session.usuarios = usuarios;
                let nombre = req.session.nombre;
                res.render('cuidadores/index', { data: {usuarios, nombre} });
            }
            else{
                res.redirect('/');
            }
        }
        catch (error){
            const rr = new Error('Algo salió mal');
            rr.status = 500;
            next(rr);
        }
    }
    
    async registro(req, res) {
        try{
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
                res.status(201).send({ mensaje: resultRegister.mensaje });
            }
        }
        catch (error){
            res.status(500).send('Ha ocurrido algo en el servidor.');
        }
    }

    logout(req, res){
        req.session.destroy();
        res.status(200).redirect('/');
    }

    async compartirPerfil(req, res){
        try{
            let resultado = await cuidadoresService.compartirPerfil(req.body.usuario, req.body.idPerfil);
            res.status(200).send(resultado);
        }
        catch (error){
            res.status(500).send('Ha ocurrido algo en el servidor.')
        }
    }

}

module.exports = CuidadoresController;