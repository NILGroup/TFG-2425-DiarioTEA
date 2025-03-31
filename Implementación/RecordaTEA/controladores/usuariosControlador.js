const UsuariosService = require('../servicios/usuariosService');
const CuidadoresService = require('../servicios/cuidadoresService');
const TarjetasService = require('../servicios/tarjetasService');

const cuidadoresService = new CuidadoresService();
const usuariosServicio = new UsuariosService();
const tarjetasService = new TarjetasService();

class UsuariosControlador {
    constructor() { }

    async leerUsuarioId(req, res) {
        res.render('TEA/indexTEA');
    }

    
    

    

    async submitEditEntry(req, res){
        const registrosString = req.body.registros; 
        const registros = JSON.parse(registrosString); 
       
        const response = await usuariosServicio.submitEditEntry(registros);

        if(response.success){
            return res.redirect('/users/diary'); // Redirigir a la página del diario, por ejemplo
        }   
        else{
            return res.status(500).send('Error interno del servidor');
        }

    }

    async login(req, res){
        let usuario = {
            usuario: req.body.usuario,
            password: req.body.passw,
        }
        let u = await usuariosServicio.login(usuario);
        if(u.mensaje === -1 || u.mensaje === -2){
            res.send(u);
        }
        else{
            let cuidador = await cuidadoresService.login(u.mensaje);
            if(cuidador.length > 0){
                req.session.rol = cuidador[0].rol;
                req.session.nombre = u.mensaje.nombre;
                req.session.idUsuario =u.mensaje.id;
                req.session.cuidador = 1;
            }
            else{
                console.log(u.mensaje);
                let config = await tarjetasService.leerConfiguracionVocabulario(u.mensaje.id);
                req.session.usuario = u.mensaje;
                req.session.cuidador = 0;
                req.session.config = config;
            }
            req.session.logged = 1;
            let esCuidador = req.session.cuidador;
            res.send({mensaje: 1, cuidador: esCuidador});
        }
    }

    async registro(req, res){
        let usuario = {
            usuario: req.body.usuario,
            passw: req.body.passw,
            nombre: req.body.nombre
        };

        let resultado = await usuariosServicio.registro(usuario);
        if(resultado.mensaje > 0){
            var u = await usuariosServicio.leerUsuarioId(resultado.mensaje);
            let r = await usuariosServicio.realacionCuidador(u[0].id, req.session.idUsuario);
            if(r.mensaje > 0){
                req.session.usuarios.push(u[0]);
                return res.send({mensaje: resultado.mensaje, usuario: u[0]});
            }
        }
        return res.send({mensaje: resultado.mensaje});
    }

    logout(req, res){
        req.session.destroy();
        res.redirect('/');
    }

}
module.exports = UsuariosControlador;