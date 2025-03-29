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
            let con;
            if (!req.session.usuario || req.session.usuario.id !== req.params.id) {
                const resultado = await usuariosService.leerUsuarioId(req.params.id);
                const c = await tarjetasService.leerConfiguracionVocabulario(resultado[0].id);
                usuario = resultado[0];
                con = c;
                req.session.usuario = resultado[0];
                req.session.config = c;
            }
            else {
                usuario = req.session.usuario;
                con = req.session.config;
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

    async redirectToDiary(req, res) {
        const response = await entradasService.leerEntradasPorUsuario(req.session.usuario.id);
        res.render('TEA/diaryTEA', { entradas: response, diary: true, usuario: req.session.usuario.nombre });
    }

    async addEntry(req, res) {

        const response = await tarjetasService.obtenerTarjetasUsuarioId(req.session.usuario.id);

        console.log(response);
        const tarjetas_emocion = response.filter(t=>t.categoria="Emocion" && t.categoria!=null);

        res.render('TEA/addEntryTEA', {vocabulario: response, diary: true, usuario: req.session.usuario.nombre})

        //OBTENER PICTOGRAMAS DEL USUARIO PARA ADD ENTRY Y RENDERIZAR

    }

    async viewEntry(req, res) {
        const idEntrada = req.params.idEntrada;
        const idUsuario = req.session.usuario.id; // Asumiendo que tienes la información del usuario autenticado

        try {
    
            // si no se encuentra en la sesión, realiza la búsqueda en la base de datos
            const entrada = await entradasService.viewEntryById(idEntrada, idUsuario);

            if (entrada) {
                return res.render('TEA/viewEntryTEA', { entrada: entrada[0],  diary: true, usuario: req.session.usuario.nombre  });
            } else {
                const error = {
                    status: 403,
                    info: "No tienes permisos para ver esta página"
                };
                // si no existe, es porque no ha cumplido con que sea el idUsuario
                return res.render('error', { error: error });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send('Error interno del servidor');
        }
    }

    async submitEntrada(req, res){
        

        const registrosString = req.body.registros; 
        const registros = JSON.parse(registrosString); 
        registros.id_usuario = req.session.usuario.id;

        const response = await entradasService.submitEntrada(registros);

        if(response.success){
            res.redirect('/diario'); // Redirigir a la página del diario, por ejemplo
        }   
        
    }


}

module.exports = EntradasController;