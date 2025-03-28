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

    async leerEntradasPorUsuario(idUsuario) {
        try {
            const entradas = await pool.query(`
                SELECT Entradas.id AS idEntrada, Entradas.autor, Entradas_tarjeta.id_entrada, Entradas_tarjeta.id_tarjeta, Entradas.fecha_registro, Entradas_tarjeta.orden, Pictos.enlace, Entradas.cuerpo, Entradas_tarjeta.emocion
                FROM Entradas
                LEFT JOIN Entradas_tarjeta ON Entradas.id = Entradas_tarjeta.id_entrada
                LEFT JOIN Tarjetas ON Entradas_tarjeta.id_tarjeta = Tarjetas.id
                LEFT JOIN Pictos ON Tarjetas.id = Pictos.id_tarjeta
                LEFT JOIN Imagenes ON Tarjetas.id = Imagenes.id_tarjeta
                WHERE Entradas.id_usuario = ?
                AND Entradas.autor = ?
                ORDER BY Entradas.fecha_registro DESC, Entradas_tarjeta.orden ASC;
            `, [idUsuario, idUsuario]);

            return entradas;
        }
        catch (error) {
            console.error('ERROR[entradasDao]: buscar entradas de usuario por Id del usuario' + error);
        }
    }

}

module.exports = EntradasDao;