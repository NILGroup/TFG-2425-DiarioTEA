const pool = require('../config/conexionbbdd');

class TarjetasDao {
    constructor() { }

    async vocabularioUsuarioId(id) {
        try {
            let [vocabulario] = await pool.query('SELECT p.id, p.enlace FROM Tarjetas t JOIN Pictos p ON t.id_picto = p.id WHERE t.id_usuario = ?',
                [id]);
            return vocabulario;
        }
        catch (error) {
            console.error('ERROR[TarjetasDao]: obtener vocabulario por ID: ', error);
            throw error;
        }
    }

    async addTarjetaVocabulario(id_arasaac, enlace, id_usuario) {
        try {
            let [picto] = await pool.query('INSERT INTO Pictos (idArasaac, enlace) VALUES (?, ?)', [id_arasaac, enlace]);
            let [response] = await pool.query('INSERT INTO Tarjetas (id_usuario, id_picto) VALUES (?, ?)', [id_usuario, picto.insertId]);
            return response.insertId;
        }
        catch (error) {
            console.error('ERROR[TarjetasDao]: agregar tarjeta al vocabulario: ', error);
            throw error;
        }
    }

    async comprobarExistenciaPicto(id_arasaac, enlace, id_usuario) {
        try {
            let [response] = await pool.query('SELECT * FROM Tarjetas JOIN Pictos ON Tarjetas.id_picto = Pictos.id' +
                ' WHERE Tarjetas.id_usuario = ? AND Pictos.idArasaac = ? AND Pictos.enlace = ?', [id_usuario, id_arasaac, enlace]);
            return response;
        }
        catch (error) {
            console.error('ERROR[TarjetasDao]: comprobar picto: ', error);
            throw error;
        }
    }
}

module.exports = TarjetasDao;