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

    async leerCuidadorUsuario(usuario){
        try{
            const [cuidador] = await pool.query('SELECT * FROM Usuarios WHERE usuario = ?', [usuario]);
            return cuidador;
        }
        catch(error){
            console.error('Error al buscar cuidador por Usuario: ', error);
            throw error;
        }
    }

    async registrarUsuario(usuario){
        try{
            const [resultado] = await pool.query('INSERT INTO Usuarios (nombre, usuario, contraseña)  VALUES (?, ?, ?)', [usuario.nombre, usuario.usuario, usuario.password]);
            return resultado;
        }
        catch(error){
            console.error('Error al registrar un Cuidador: ', error);
            throw error;
        }
    }
}

module.exports = CuidadoresDao;