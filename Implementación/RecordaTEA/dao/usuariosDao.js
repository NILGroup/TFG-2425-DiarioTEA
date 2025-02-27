const pool = require('../db');

class UsuariosDao{
    constructor() {}

    async leerUsuarioId(id){
        try{
            const resultado = await pool.query('SELECT * FROM Usuarios WHERE id = ?', [id]);
            return resultado[0];
        }
        catch(error){
            console.error('Error al buscar usuario por ID: ', error);
            throw error;
        }
    }
}

module.exports = UsuariosDao;