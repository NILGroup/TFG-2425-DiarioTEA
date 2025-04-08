const RutinasService = require('../servicios/rutinasService')
const rutinasServicio = new RutinasService();
const TarjetasService = require('../servicios/tarjetasService');
const tarjetasService = new TarjetasService();

class RutinasControlador {

    constructor() { }

    async getUserRutinas(req, res) {
        try {
            if (req.session.logged) {
                if (req.session.cuidador) { res.status(403).redirect('/cuidadores/inicio') }
                const idUsuario = req.session.usuario.id;

                const response = await rutinasServicio.getRutinasById(idUsuario);

                res.render('TEA/rutinasTEA', { rutinas: response, diary: false, usuario: req.session.usuario.nombre, config: req.session.config })
            }
            else {
                res.redirect('/');
            }
        }
        catch (error) {
            const rr = new Error('Algo salió mal');
            rr.status = 500;
            next(rr);
        }
    }

    async getCuidadoresRutinas(req, res) {
        try {
            if (req.session.logged) {
                if (!req.session.cuidador) { res.status(403).redirect('/users'); }
                const response = await rutinasServicio.getRutinasById(req.session.usuario.id);

                let data = {
                    rutinas: response,
                    nombreUsuario: req.session.usuario.nombre,
                    idUsuario: req.session.usuario.id,
                    usuarios: req.session.usuarios,
                    config: req.session.config
                }

                res.status(200).render('cuidadores/rutinas', { data: data });
            }
            else {
                res.redirect('/');
            }
        }
        catch (error) {
            const rr = new Error('Algo salió mal');
            rr.status = 500;
            next(rr);
        }
    }

    async getTarjetasByIdRutina(req, res) {
        try {
            if (req.session.logged) {
                if (req.session.cuidador) { res.status(403).redirect('/cuidadores/inicio') }
                const idRutina = req.params.idRutina;
                const response = await rutinasServicio.getTarjetasByIdRutina(idRutina);

                res.status(200).render('TEA/viewRutinaTEA', { rutinas: response, diary: false, nombreRutina: response[0].nombre, usuario: req.session.usuario.nombre, config: req.session.config });
            }
            else {
                res.redirect('/');
            }
        }
        catch (error) {
            const rr = new Error('Algo salió mal');
            rr.status = 500;
            next(rr);
        }
    }

    async getTarjetasByIdRutinaCuidador(req, res) {
        try {
            if (req.session.logged) {
                if (!req.session.cuidador) { res.status(403).redirect('/users'); }
                const idRutina = req.params.idRutina;
                const response = await rutinasServicio.getTarjetasByIdRutina(idRutina);

                let data = {
                    rutinas: response,
                    nombreUsuario: req.session.usuario.nombre,
                    idUsuario: req.session.usuario.id,
                    usuarios: req.session.usuarios,
                    config: req.session.config
                }
                res.status(200).render('cuidadores/viewRutina', { data: data });
            }
            else {
                res.redirect('/');
            }
        }
        catch (error) {
            const rr = new Error('Algo salió mal');
            rr.status = 500;
            next(rr);
        }
    }

    async addRutina(req, res) {
        try {
            if (req.session.logged) {
                if (!req.session.cuidador) { res.status(403).redirect('/users'); }
                //let id_usuario = req.session.usuario.id;
                let vocabulario = await tarjetasService.obtenerTarjetasUsuarioId(req.session.usuario.id);

                let data = {
                    vocabulario: vocabulario,
                    nombreUsuario: req.session.usuario.nombre,
                    idUsuario: req.session.usuario.id,
                    usuarios: req.session.usuarios,
                    config: req.session.config
                }

                res.status(200).render('cuidadores/crearRutina', { data: data });
            }
            else {
                res.redirect('/');
            }

        }
        catch (error) {
            const rr = new Error('Algo salió mal');
            rr.status = 500;
            next(rr);
        }
    }

    async submitRutina(req, res) {
        try {
            if (req.session.logged) {
                if (!req.session.cuidador) { res.status(403).redirect('/users'); }
                const tarjetasRutina = req.body.rutina;
                const rutina = JSON.parse(tarjetasRutina);
                rutina.autor = req.session.idUsuario;


                const response = await rutinasServicio.crearRutina(rutina);

                if (response.success) {
                    res.redirect("/rutinas");
                }
                else {
                    res.status(500).render('error', { error: response })
                }
            }
            else {
                res.redirect('/');
            }
        }
        catch (error) {
            const rr = new Error('Algo salió mal');
            rr.status = 500;
            next(rr);
        }
    }



}
module.exports = RutinasControlador;