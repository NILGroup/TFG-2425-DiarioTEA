const pool = require('../config/conexionbbdd');
class RutinassDao {
    constructor() { }

    async leerRutina(id) {
        try {
            const resultado = await pool.query('SELECT * FROM Rutinas WHERE id = ?', [id]);
            return resultado[0];
        }
        catch (error) {
            console.error('Error al buscar la rutina por ID: ', error);
            throw error;
        }
    }

    async getRutinasById(idUsuario) {
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

    async getTarjetasByIdRutina(idRutina) {
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

    async crearRutina(data) {
        try {
            const [rutina] = await pool.query(
                `INSERT INTO Rutinas (id_usuario, nombre, autor, fecha_creacion) VALUES (?, ?, ?, ?);`,
                [data.id_usuario, data.nombre, data.autor, data.fecha_creacion]
            );

            if (rutina.affectedRows === 1) {
                const queries = data.tarjetas.map(tarjeta => [
                    rutina.insertId,
                    tarjeta.id_tarjeta,
                    tarjeta.orden
                ]);
                // Inserta en la tabla 'entradas_tarjeta'
                const [rutinas_tarjeta] = await pool.query(
                    `INSERT INTO rutinas_tarjeta (id_rutina, id_tarjeta, orden) VALUES ?;`,
                    [queries]
                );
                return { success: true, id: rutina.insertId }; // Devuelve el ID de la entrada
            }

            return e;
            
        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = RutinassDao;