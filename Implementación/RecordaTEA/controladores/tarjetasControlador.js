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
            if (1) {
                console.log('Paso el if');
                this.resultadoArasaac = await tarjetasService.consultaArasaac(consulta);
                res.send(this.resultadoArasaac);
                if (this.resultadoArasaac.length > 0) {
                    for (let i = 0; i < 20; i++) {
                        let picto = await tarjetasService.pictosArasaac(this.resultadoArasaac[i]._id);
                    }
                }
            }
        } catch (error) {
            console.log(error);
            res.status(500);
        }
    }
}

module.exports = TarjetasControlador;