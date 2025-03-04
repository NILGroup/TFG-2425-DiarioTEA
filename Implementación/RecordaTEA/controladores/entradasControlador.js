const EntradasService = require('../servicios/entradasService');
const TarjetasService = require('../servicios/tarjetasService');
const fechaUtils = require('../utils/fechaUtils');

const entradasService = new EntradasService();
const tarjetasService = new TarjetasService();

class EntradasController{
    constructor(){}

    async cargarDiario(req, res){
        try{
            let usuario = req.session.usuario;
            let entradas = await entradasService.entradasMes(usuario.id);
            for(let entrada of entradas){
                entrada.mes = fechaUtils.mesAbreviatura(entrada.fecha).toUpperCase();
                entrada.dia = fechaUtils.dia(entrada.fecha);
                entrada.hoy = fechaUtils.esHoy(entrada.fecha);
                entrada.f = fechaUtils.fechaCompleta(entrada.fecha);
                if(entrada.cuerpo === null){
                    let pictos = await tarjetasService.tarjetasEntrada(entrada.id);
                    entrada.pictos = pictos;
                }
                else{
                    entrada.pictos = [];
                }
            }
            console.log(entradas);
            res.render('diario', {data: {entradas: entradas, usuario: usuario}});
        }
        catch (error){
            throw error;
        }
    }

}

module.exports = EntradasController;