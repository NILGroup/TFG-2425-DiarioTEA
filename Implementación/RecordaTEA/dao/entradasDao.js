const pool = require('../config/conexionbbdd');

class EntradasDao {
    constructor() { }

    async entradasMes(usuario) {
        try {
            let [entradas] = await pool.query(`
                SELECT e.cuerpo, 
                       DATE(e.fecha_registro) AS fecha, 
                       COUNT(*) AS entradas, 
                       (SELECT e2.id 
                        FROM Entradas e2 
                        WHERE DATE(e2.fecha_registro) = DATE(e.fecha_registro) 
                              AND e2.id_usuario = e.id_usuario 
                        ORDER BY e2.fecha_registro DESC 
                        LIMIT 1) AS id
                FROM Entradas e 
                WHERE e.id_usuario = ? 
                      AND MONTH(e.fecha_registro) = MONTH(CURDATE()) 
                      AND YEAR(e.fecha_registro) = YEAR(CURDATE()) 
                GROUP BY DATE(e.fecha_registro)
                ORDER BY DATE(e.fecha_registro) DESC;
            `, [usuario]);
            

            return entradas;
        }
        catch (error) {
            console.log('ERROR[EntradasDao]: obtener entrdas de un mes: ', error);
            throw error;
        }
    }

    async entradaDia(dia, usuario) {
        try {
            let [entradas] = await pool.query('SELECT * FROM Entradas WHERE DATE(fecha_registro) = ? AND id_usuario = ? ORDER BY fecha_registro DESC', [dia, usuario]);
            return entradas;
        }
        catch (error) {
            console.log('ERROR[EntradasDao]: obtener entrdas de un día: ', error);
            throw error;
        }
    }
}

module.exports = EntradasDao;