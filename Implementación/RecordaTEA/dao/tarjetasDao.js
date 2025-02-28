const pool = require('../config/conexionbbdd');

class TarjetasDao {
    constructor() { }

    async vocabularioUsuarioId(id) {
        try {
            const [vocabulario] = await pool.query('SELECT p.id, p.enlace FROM Tarjetas t JOIN Pictos p ON t.id_picto = p.id WHERE t.id_usuario = ?', 
                [id]);
            return vocabulario;
        }
        catch(error){
            console.error('ERROR[TarjetasDao]: obtener vocabulario por ID: ', error);
            throw error;
        }
    }
}

module.exports = TarjetasDao;