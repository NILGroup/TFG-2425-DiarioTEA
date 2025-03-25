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

    async login(usuario){
        try{
            const [resultado] = await pool.query('SELECT * FROM Cuidadores WHERE id = ?', [usuario.id]);
            return resultado;
        }
        catch(error){
            console.error('Error al iniciar sesión de un Cuidador: ', error);
            throw error;
        }
    }

    async registro(usuario){
        try{
            const [resultado] = await pool.query('INSERT INTO Cuidadores (id, rol) VALUES(?, ?)', [usuario.id, usuario.rol]);
            return resultado;
        }
        catch(error){
            console.error('Error al iniciar sesión de un Cuidador: ', error);
            throw error;
        }
    }
}

module.exports = CuidadoresDao;