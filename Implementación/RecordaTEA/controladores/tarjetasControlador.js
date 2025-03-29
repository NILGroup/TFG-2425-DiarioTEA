const TarjetasService = require('../servicios/tarjetasService');
const tarjetasService = new TarjetasService();

class TarjetasControlador {
    constructor() {
        this.resultadoArasaac = [];
    }

    async obtenerPictosUsuarioId(req, res) {
        try {
            console.log('llego al voc');
            let id_usuario = req.session.usuario.id;
            let vocabulario = await tarjetasService.obtenerPictosUsuarioId(id_usuario);
            let imagenes = await tarjetasService.imagenesUsuarioId(id_usuario);
            imagenes.forEach((elem) => {
                let imgbase64 = elem.imagen.toString('base64'); 
                let url = 'data:' + elem.mimetype + ';base64,' + imgbase64;
                elem.imagen = url;
            });
            let data = {
                usuario: req.session.usuario,
                usuarios: req.session.usuarios,
                voc: vocabulario,
                imgs: imagenes
            };
            console.log('he llegado: ' + data)
            res.render('cuidadores/gestionTarjetas', { data: data });
        }
        catch (error) {
            res.status(500)
        }
    }

    async consultaArasaac(req, res) {
        let pictos = [];
        this.resultadoArasaac = [];
        try {
            let consulta = req.query.consulta;
            if (consulta !== null && consulta !== undefined) {
                this.resultadoArasaac = await tarjetasService.consultaArasaac(consulta);
                if (this.resultadoArasaac.length > 0) {
                    for (let i = 0; i < this.resultadoArasaac.length && i < 18; i++) {
                        let picto = await tarjetasService.pictosArasaac(this.resultadoArasaac[i]._id);
                        pictos.push({ id_arasaac: this.resultadoArasaac[i]._id, enlace: picto.image });
                    }
                }
                res.send({ pictos: pictos, paginacion: this.resultadoArasaac.length });
            }

        } catch (error) {
            if (error.response && error.response.status === 404) {
                res.send({ pictos: pictos, paginacion: this.resultadoArasaac.length });
            }
            else {
                throw error;
            }
        }
    }

    async pasarPagina(req, res) {
        try {
            let pagina = req.query.pagina;
            let pictos = [];
            let index = this.resultadoArasaac.length;
            let pag = (index - (18 * (pagina - 1)));
            if (this.resultadoArasaac.length > 0) {
                for (let i = (18 * (pagina - 1)); i < index && i < (18 * pagina); i++) {
                    let picto = await tarjetasService.pictosArasaac(this.resultadoArasaac[i]._id);
                    pictos.push({ id_arasaac: this.resultadoArasaac[i]._id, enlace: picto.image });
                }
            }
            res.send({ pictos: pictos, paginacion: pag });
        }
        catch (error) {
            throw error;
        }
    }

    async addTarjetaVocabulario(req, res) {
        try {
            let id_usuario = req.session.usuario.id;
            let id_arasaac = req.body.id_arasaac;
            let enlace = req.body.enlace;

            let success = await tarjetasService.addTarjetaVocabulario(id_arasaac, enlace, id_usuario);
            res.send(success);
        }
        catch (error) {
            throw error;
        }
    }

    async eliminarTarjetaVocabulario(req, res) {
        try {
            let id = req.body.id;
            let eliminacion = await tarjetasService.eliminarTarjetaVocabulario(id);
            res.send(eliminacion);
        }
        catch (error) {
            throw error;
        }
    }

    async addTarjetaImagen(req, res) {
        let tarjeta = {
            imagen: req.file.buffer,
            mimetype: req.file.mimetype,
            id_usuario: req.session.usuario.id,
            tam: req.file.size
        }

        let resultado = await tarjetasService.addTarjetaImagen(tarjeta);
        res.send(resultado);
    }

    async textoLibre(req, res){
        let resultado = await tarjetasService.textoLibre(req.body.texto, req.session.usuario.id);
        res.send({success: resultado});
    }
}

module.exports = TarjetasControlador;