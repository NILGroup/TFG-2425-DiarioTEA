const pool = require('../config/conexionbbdd');

class UsuariosDao{
    constructor() {}

    async leerUsuarioId(id){
        try{
            const resultado = await pool.query('SELECT * FROM Usuarios WHERE id = ?', [id]);
            return resultado[0];
        }
        catch(error){
            console.error('ERROR[UsuariosDao]: buscar usuario por ID: ', error);
            throw error;
        }
    }

    async leerUsuariosCuidador(idCuidador){
        try{
            const usuarios = await pool.query('SELECT Usuarios.nombre, Usuarios.id FROM Usuarios JOIN Cuidadores_Usu ON Usuarios.id = Cuidadores_Usu.id_usuario WHERE Cuidadores_Usu.id_cuidador = ?', [idCuidador]);
            console.log(usuarios);
            return usuarios[0];
        }
        catch(error){
            console.error('ERROR[UsuariosDao]: buscar usuarios por Id del cuidador');
        }
    }
}

module.exports = UsuariosDao;