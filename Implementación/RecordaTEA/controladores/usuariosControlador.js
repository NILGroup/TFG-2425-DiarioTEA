const UsuariosService = require('../servicios/usuariosService')
const usuariosServicio = new UsuariosService();

class UsuariosControlador {
    constructor() { }

    async leerUsuarioId(req, res) {
        const r = await usuariosServicio.leerUsuarioId(1);
        req.session.logged = 1;
        req.session.usuario = r[0];
        res.render('TEA/indexTEA');
    }

    async redirectToDiary(req, res) {
        const response = await usuariosServicio.leerDiarioPorUsuario(req.session.usuario.id);
        res.render('TEA/diaryTEA', { entradas: response, diary: true });
    }

    async addEntry(req, res) {

        const response = await usuariosServicio.obtenerTarjetasPorUsuario(req.session.usuario.id);

        console.log(response);
        res.render('TEA/addEntryTEA', {vocabulario: response, diary: true, usuario: req.session.usuario.nombre })

        //OBTENER PICTOGRAMAS DEL USUARIO PARA ADD ENTRY Y RENDERIZAR

    }

    async submitEntry(req, res){
        

        const registrosString = req.body.registros; 
        const registros = JSON.parse(registrosString); 
        registros.id_usuario = req.session.usuario.id;

        const response = await usuariosServicio.submitEntry(registros);

        if(response.success){
            res.redirect('/users/diary'); // Redirigir a la página del diario, por ejemplo
        }   
        
    }

    async viewEntry(req, res) {
        const idEntrada = req.params.idEntrada;
        const idUsuario = req.session.usuario.id; // Asumiendo que tienes la información del usuario autenticado

        try {
    
            // si no se encuentra en la sesión, realiza la búsqueda en la base de datos
            const entrada = await usuariosServicio.viewEntryById(idEntrada, idUsuario);

            if (entrada) {
                return res.render('TEA/viewEntryTEA', { entrada: entrada[0],  diary: true  });
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

    async editEntryView(req, res){

        const idEntrada = req.params.idEntrada;
        const idUsuario = req.session.usuario.id;

        try {

            const vocabulario = await usuariosServicio.obtenerTarjetasPorUsuario(idUsuario);

            // si no se encuentra en la sesión, realiza la búsqueda en la base de datos
            const entrada = await usuariosServicio.viewEntryById(idEntrada, idUsuario);
            

            if (entrada) {
                return res.render('TEA/editEntryTEA', { entrada: entrada[0], diary: true, vocabulario: vocabulario });
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
    



}
module.exports = UsuariosControlador;