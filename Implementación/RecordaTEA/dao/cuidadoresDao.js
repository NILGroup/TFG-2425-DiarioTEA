const pool = require('../config/conexionbbdd');

class CuidadoresDao{
    constructor() {}

    async leerCuidadorId(id){
        try{
            const resultado = await pool.query('SELECT * FROM Cuidadores WHERE id = ?', [id]);
            return resultado[0];
        }
        catch(error){
            console.error('Error al buscar usuario por ID: ', error);
            throw error;
        }
    }
}

module.exports = CuidadoresDao;