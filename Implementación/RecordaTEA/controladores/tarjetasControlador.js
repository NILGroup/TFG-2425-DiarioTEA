const TarjetasService = require('../servicios/tarjetasService');
const tarjetasService = new TarjetasService();

class TarjetasControlador {
    constructor() {
        this.resultadoArasaac = [];
        this.indice = 0;
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
            this.indice = 0;
            let ultimoElem = 0;
            if (consulta !== null && consulta !== undefined) {
                this.resultadoArasaac = await tarjetasService.consultaArasaac(consulta);
                if (this.resultadoArasaac.length > 0) {
                    for (let i = 0; i < this.resultadoArasaac.length && i < 20; i++) {
                        let picto = await tarjetasService.pictosArasaac(this.resultadoArasaac[i]._id);
                        pictos.push({id_arasaac: this.resultadoArasaac[i]._id, enlace: picto.image});
                        ultimoElem = i;
                    }
                }
                this.indice += ultimoElem;
                res.send(pictos);
            }

        } catch (error) {
            if (error.response && error.response.status === 404) {
                res.send(this.resultadoArasaac);
            }
            else{
                throw error;
            }
        }
    }
}

module.exports = TarjetasControlador;