const EntradasService = require('../servicios/entradasService');
const TarjetasService = require('../servicios/tarjetasService');
const UsuariosService = require('../servicios/usuariosService');
const fechaUtils = require('../utils/fechaUtils');

const entradasService = new EntradasService();
const tarjetasService = new TarjetasService();
const usuariosService = new UsuariosService();

class EntradasController {
    constructor() { }

    async cargarDiario(req, res) {
        try {
            let usuario;
            let usus = req.session.usuarios;
            if (!req.session.usuario || req.session.usuario.id !== req.params.id) {
                const resultado = await usuariosService.leerUsuarioId(req.params.id);
                usuario = resultado[0];
                req.session.usuario = resultado[0];
            }
            else {
                usuario = req.session.usuario;
            }
            let entradas = await entradasService.entradasMes(usuario.id);
            for (let entrada of entradas) {
                entrada.mes = fechaUtils.mesAbreviatura(entrada.fecha).toUpperCase();
                entrada.dia = fechaUtils.dia(entrada.fecha);
                entrada.hoy = fechaUtils.esHoy(entrada.fecha);
                entrada.f = fechaUtils.fechaCompleta(entrada.fecha);
                entrada.fecha = fechaUtils.fechaSinHora(entrada.fecha);
                if (entrada.cuerpo === null) {
                    let pictos = await tarjetasService.tarjetasEntrada(entrada.id);
                    entrada.pictos = pictos;
                }
                else {
                    entrada.pictos = [];
                }
            }

            res.render('cuidadores/diario', { data: { entradas: entradas, usuario: usuario, usuarios: usus } });
        }
        catch (error) {
            throw error;
        }
    }

    async cargarDia(req, res) {
        try {
            let dia = req.params.dia;
            let usuario = req.session.usuario;
            let usus = req.session.usuarios;
            let entradas = await entradasService.entradasDia(dia, usuario.id);
            for (let entrada of entradas) {
                let autor = await usuariosService.leerUsuarioId(entrada.autor);
                entrada.autor = autor[0];
                entrada.hora = fechaUtils.horaMinutos(entrada.fecha_registro);
                if (entrada.cuerpo === null) {
                    let pictos = await tarjetasService.tarjetasEntrada(entrada.id);
                    entrada.pictos = pictos;
                }
                else {
                    entrada.pictos = [];
                }
            }
            let diaCompleto = fechaUtils.fechaCompleta(dia);
            res.render('cuidadores/verDia', { data: { entradas: entradas, usuario: usuario, dia: diaCompleto, usuarios: usus } });
        }
        catch (error) {
            throw error;
        }
    }

}

module.exports = EntradasController;