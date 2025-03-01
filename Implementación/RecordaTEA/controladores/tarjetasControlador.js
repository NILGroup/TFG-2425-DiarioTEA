const TarjetasService = require('../servicios/tarjetasService');
const tarjetasService = new TarjetasService();

class TarjetasControlador {
    constructor() {
        this.resultadoArasaac = [];
    }

    async vocabularioUsuarioId(req, res) {
        try {
            let id_usuario = req.session.usuario.id;
            let vocabulario = await tarjetasService.vocabularioUsuarioId(id_usuario);
            let data = {
                usuario: req.session.usuario,
                voc: vocabulario
            };
            res.render('gestionTarjetas', { data: data });
        }
        catch (error) {
            res.status(500)
        }
    }

    async consultaArasaac(req, res) {
        try {
            let consulta = req.query.consulta;
            let pictos = [];
            this.resultadoArasaac = [];
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
                res.send(this.resultadoArasaac);
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
}

module.exports = TarjetasControlador;