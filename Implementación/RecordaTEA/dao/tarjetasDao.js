const pool = require('../config/conexionbbdd');

class TarjetasDao {
  constructor() { }

  async vocabularioUsuarioId(id) {
    try {
      let [vocabulario] = await pool.query('SELECT p.id, p.enlace, t.id as idTarjeta FROM Tarjetas t JOIN Pictos p ON t.id = p.id_tarjeta WHERE t.id_usuario = ?',
        [id]);
      console.log(vocabulario)
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

  async eliminarTarjetaVocabulario(idTarjeta, idRecurso) {
    try {
      let [response] = await pool.query('DELETE FROM Tarjetas WHERE id = ?', [idTarjeta]);
      let a = await pool.query('DELETE FROM Pictos WHERE id = ?', [idRecurso]);
      return response.affectedRows;
    }
    catch (error) {
      console.error('ERROR[TarjetasDao]: eliminar tarjeta: ', error);
      throw error;
    }
  }

  async buscarPictoIdTarjeta(idTarjeta) {
    try {
      let [picto] = await pool.query('SELECT Pictos.id FROM Pictos JOIN Tarjetas ON Pictos.id = Tarjetas.id_picto WHERE Tarjetas.id = ?', [idTarjeta]);
      return picto;
    }
    catch (error) {
      console.error('ERROR[TarjetasDao]: buscar picto con id tarjeta: ', error);
      throw error;
    }
  }

  async tarjetasEntrada(id_entrada) {
    try {
      let [pictos] = await pool.query('SELECT p.enlace FROM Pictos p JOIN Tarjetas t ON p.id = t.id_picto JOIN Entradas_tarjeta et ON t.id = et.id_tarjeta WHERE et.id_entrada = ? ORDER BY et.orden', [id_entrada]);
      return pictos;
    }
    catch (error) {
      console.error('ERROR[TarjetasDao]: buscar picto con id entrada: ', error);
      throw error;
    }
  }

  async addImagen(tarjeta) {
    try {
      let [resultado] = await pool.query('INSERT INTO Tarjetas (id_usuario) VALUES (?)', [tarjeta.id_usuario]);
      let [resultadoImagen] = await pool.query('INSERT INTO Imagenes (imagen, mimetype, id_tarjeta) VALUES (?, ?, ?)', [tarjeta.imagen, tarjeta.mimetype, resultado.insertId]);
      return resultadoImagen.insertId;
    }
    catch (error) {
      console.log('ERROR AL INSERTAR IMAGEN', error);
    }
  }

  async imagenesUsuarioId(usuarioId) {
    try {
      let [imagenes] = await pool.query('SELECT t.id AS idTarjeta, i.imagen, i.mimetype, i.id FROM Tarjetas t JOIN Imagenes i ON t.id = i.id_tarjeta WHERE t.id_usuario = ? AND t.activa = 1', [usuarioId]);
      console.log(imagenes)
      return imagenes;
    }
    catch (error) {

    }
  }
}

module.exports = TarjetasDao;