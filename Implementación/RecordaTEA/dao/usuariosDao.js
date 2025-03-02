const pool = require('../config/conexionbbdd');

class UsuariosDao {
    constructor() { }

    async leerUsuarioId(id) {
        try {
            const resultado = await pool.query('SELECT * FROM Usuarios WHERE id = ?', [id]);
            return resultado[0];
        }
        catch (error) {
            console.error('ERROR[UsuariosDao]: buscar usuario por ID: ', error);
            throw error;
        }
    }

    async leerUsuariosCuidador(idCuidador) {
        try {
            const usuarios = await pool.query('SELECT Usuarios.nombre, Usuarios.id FROM Usuarios JOIN Cuidadores_Usu ON Usuarios.id = Cuidadores_Usu.id_usuario WHERE Cuidadores_Usu.id_cuidador = ?', [idCuidador]);
            return usuarios[0];
        }
        catch (error) {
            console.error('ERROR[UsuariosDao]: buscar usuarios por Id del cuidador');
        }
    }

    async leerDiarioPorUsuario(idUsuario) {
        try {
            const entradas = await pool.query(`
                SELECT Entradas.id AS idEntrada, Entradas.autor, Entradas_tarjeta.id_entrada, Entradas_tarjeta.id_tarjeta, Entradas.fecha_registro, Entradas_tarjeta.orden, Pictos.enlace, Entradas.cuerpo
                FROM Entradas
                LEFT JOIN Entradas_tarjeta ON Entradas.id = Entradas_tarjeta.id_entrada
                LEFT JOIN Tarjetas ON Entradas_tarjeta.id_tarjeta = Tarjetas.id
                LEFT JOIN Pictos ON Tarjetas.id_picto = Pictos.id
                WHERE Entradas.id_usuario = ?
                AND Entradas.autor = ?
                ORDER BY Entradas.fecha_registro DESC;
            `, [idUsuario, idUsuario]);





            console.log(entradas);
            return entradas;
        }
        catch (error) {
            console.error('ERROR[UsuariosDao]: buscar entradas de usuario por Id del usuario');
        }
    }

    async obtenerTarjetasPorUsuario(idUsuario) {
        try {
            const response = await pool.query(`SELECT * 
                FROM Tarjetas JOIN Pictos ON Tarjetas.id_picto = Pictos.id
                WHERE Tarjetas.id_usuario = ?
                `, [idUsuario]);

            return response;
        }


        catch (error) {
            console.log(error);
        }
    }


    async viewEntryById(idEntrada, idUsuario) {
        try {
            const entradas = await pool.query(`
                 SELECT Entradas.id AS idEntrada, Entradas.autor, Entradas_tarjeta.id_entrada, Entradas_tarjeta.id_tarjeta, Entradas.fecha_registro, Entradas_tarjeta.orden, Pictos.enlace, Entradas.cuerpo
                FROM Entradas
                LEFT JOIN Entradas_tarjeta ON Entradas.id = Entradas_tarjeta.id_entrada
                LEFT JOIN Tarjetas ON Entradas_tarjeta.id_tarjeta = Tarjetas.id
                LEFT JOIN Pictos ON Tarjetas.id_picto = Pictos.id
                WHERE Entradas.id = ?
                AND Entradas.id_Usuario = ?
                ORDER BY Entradas.fecha_registro DESC;
            `, [idEntrada, idUsuario]);

            
            return entradas;
        }
        catch (error) {
            console.log(error);
        }


    }
};



module.exports = UsuariosDao;