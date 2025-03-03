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
    async submitEntry(data) {
        try {
            // Inserta en la tabla 'entradas'
            const [entrada] = await pool.query(
                `INSERT INTO entradas (id_usuario, autor, fecha_registro) VALUES (?, ?, ?);`,
                [data.id_usuario, data.id_usuario, data.fecha_registro]
            );
    
            // Verifica que la fila fue insertada correctamente
            if (entrada.affectedRows === 1) {
                // Prepara los valores para la inserción masiva
                const queries = data.tarjetas.map(tarjeta => [
                    entrada.insertId,
                    tarjeta.id,
                    tarjeta.orden
                ]);
    
                // Inserta en la tabla 'entradas_tarjeta'
                const [entradas_tarjeta] = await pool.query(
                    `INSERT INTO entradas_tarjeta (id_entrada, id_tarjeta, orden) VALUES ?;`,
                    [queries]
                );

                return { success: true, id: entrada.insertId }; // Devuelve el ID de la entrada
    
            }

        } catch (error) {
            console.error('Error al registrar la entrada:', error);
            throw error; // Lanza el error para que el llamador lo maneje
        }
    }
    
    async getRutinasById(idUsuario){
        try {
            const response = await pool.query(`SELECT * 
                FROM Rutinas
                WHERE Rutinas.id_usuario = ?
                `, [idUsuario]);

            return response;
        }


        catch (error) {
            console.log(error);
        }
    }

    async getTarjetasByIdRutina(idRutina){
        try {
            const tarjetas = await pool.query(`
                SELECT Rutinas.id, Rutinas.nombre, Tarjetas.id, Tarjetas.id_picto, Pictos.enlace
                FROM Rutinas LEFT JOIN Rutinas_tarjeta ON Rutinas.id = Rutinas_tarjeta.id_rutina
                LEFT JOIN Tarjetas ON Rutinas_tarjeta.id_tarjeta = Tarjetas.id
                LEFT JOIN Pictos ON Tarjetas.id_picto = Pictos.id
                WHERE Rutinas.id = ?
                ORDER BY Rutinas_tarjeta.orden ASC;
           `, [idRutina]);

           return tarjetas;
        }

        
        catch (error) {
            console.log(error);
        }
    }

    
};



module.exports = UsuariosDao;