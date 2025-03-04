const UsuariosService = require('../servicios/usuariosService')
const usuariosServicio = new UsuariosService();

class UsuariosControlador {
    constructor() { }

    async leerUsuarioId(req, res) {
        const r = await usuariosServicio.leerUsuarioId(1);
        req.session.logged = 1;
        req.session.nombre = r.nombre;
        req.session.usuario = r[0];
        res.render('indexTEA');
    }

    async redirectToDiary(req, res) {
        const response = await usuariosServicio.leerDiarioPorUsuario(req.session.usuario.id);
        req.session.entradas = response;
        //siempre le paso diary true si me encuentro en una vista del diario para que solo 
        // se muestre en la navbar el dibujo de rutina
        res.render('diaryTEA', { entradas: response, diary: true });
    }

    async addEntry(req, res) {

        const response = await usuariosServicio.obtenerTarjetasPorUsuario(req.session.usuario.id);

        console.log(response);
        res.render('addEntryTEA', {vocabulario: response, diary: true, usuario: req.session.usuario.nombre })

        //OBTENER PICTOGRAMAS DEL USUARIO PARA ADD ENTRY Y RENDERIZAR

    }

    async submitEntry(req, res){
        

        const registrosString = req.body.registros; 
        const registros = JSON.parse(registrosString); 

        const response = await usuariosServicio.submitEntry(registros);

        if(response.success){
            res.redirect('/users/diary'); // Redirigir a la página del diario, por ejemplo
        }   
        
    }

    async viewEntry(req, res) {
        const idEntrada = req.params.idEntrada;
        const idUsuario = req.session.usuario.id; // Asumiendo que tienes la información del usuario autenticado

        try {
            // ya se ha guardado
            if (req.session.entradas) {
                const entradaSeleccionada = req.session.entradas.find(item => item.idEntrada.toString() === idEntrada.toString());
                if (entradaSeleccionada) {
                    return res.render('viewEntryTEA', { entrada: entradaSeleccionada, diary: true });
                }
            }

            // si no se encuentra en la sesión, realiza la búsqueda en la base de datos
            const entrada = await usuariosServicio.viewEntryById(idEntrada, idUsuario);

            if (entrada) {
                return res.render('viewEntryTEA', { entrada: entrada });
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

    



}
module.exports = UsuariosControlador;