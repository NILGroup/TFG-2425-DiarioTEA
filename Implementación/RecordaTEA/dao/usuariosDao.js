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

    


    async viewEntryById(idEntrada, idUsuario) {
        try {
            const entradas = await pool.query(`
                 SELECT Entradas.id AS idEntrada, Entradas.autor, Entradas_tarjeta.id_entrada, Entradas_tarjeta.id_tarjeta, Entradas.fecha_registro, Entradas_tarjeta.orden, Pictos.enlace, Entradas.cuerpo, Entradas_tarjeta.emocion
                FROM Entradas
                LEFT JOIN Entradas_tarjeta ON Entradas.id = Entradas_tarjeta.id_entrada
                LEFT JOIN Tarjetas ON Entradas_tarjeta.id_tarjeta = Tarjetas.id
                LEFT JOIN Pictos ON Tarjetas.id_picto = Pictos.id
                WHERE Entradas.id = ?
                AND Entradas.id_Usuario = ?
                ORDER BY Entradas.fecha_registro DESC, Entradas_tarjeta.orden ASC;
            `, [idEntrada, idUsuario]);


            return entradas;
        }
        catch (error) {
            console.log(error);
        }


    }
    

    async actualizarTarjetasEntrada(data) {
        const conn = await pool.getConnection();
        try {
            await conn.beginTransaction();

            // 1. Actualizar la entrada
            await conn.execute(
                'UPDATE entradas SET fecha_registro = ? WHERE id = ?',
                [data.fecha_registro, data.id]
            );

            // 2. Obtener tarjetas actuales de la base de datos
            const [rows] = await conn.execute(
                'SELECT id_tarjeta, orden, emocion FROM entradas_tarjeta WHERE id_entrada = ?',
                [data.id]
            );

            const actuales = new Map(rows.map(t => [t.id_tarjeta, t.orden]));
            const nuevas = new Map(data.tarjetas.map(t => [t.id, t.orden]));


            // 3. Eliminar tarjetas que ya no están
            for (const [id_tarjeta_actual] of actuales) {
                if (!nuevas.has(id_tarjeta_actual)) {
                    await conn.execute(
                        'DELETE FROM entradas_tarjeta WHERE id_entrada = ? AND id_tarjeta = ?',
                        [data.id, id_tarjeta_actual]
                    );
                }
            }

            // 4. Insertar nuevas tarjetas o actualizar orden
            for (const { id, orden, emocion } of data.tarjetas) {
                if (!actuales.has(id)) {
                    // No existía antes: insertar

                    const [existingEntry] = await conn.execute(
                        'SELECT 1 FROM entradas_tarjeta WHERE id_entrada = ? AND id_tarjeta = ?',
                        [data.id, id]
                    );
                    
                    if (existingEntry.length === 0) {
                        await conn.execute(
                            'INSERT INTO entradas_tarjeta (id_entrada, id_tarjeta, orden, emocion) VALUES (?, ?, ?, ?)',
                            [data.id, id, orden, emocion]
                        );
                    }
                    
                    
                } else {
                    const actual = actuales.get(id);
            
                    if (actual.orden !== orden) {
                        // Existía pero con distinto orden: actualizar
                        await conn.execute(
                            'UPDATE entradas_tarjeta SET orden = ? WHERE id_entrada = ? AND id_tarjeta = ?',
                            [orden, data.id, id]
                        );
                    }
            
                }
            }
            

            await conn.commit();
            return { success: true };

        } catch (err) {
            await conn.rollback();
            console.error(err);
            return { success: false, error: err };
        } finally {
            conn.release();
        }
    }

    async login(usuario) {
        const [u] = await pool.query('SELECT * FROM Usuarios WHERE usuario = ?', [usuario.usuario]);
        return u[0];
    }

    async leerUsuario(usuario) {
        try {
            const [usu] = await pool.query('SELECT * FROM Usuarios WHERE usuario = ?', [usuario]);
            return usu;
        }
        catch (error) {
            console.error('Error al buscar cuidador por Usuario: ', error);
            throw error;
        }
    }

    async registrarUsuario(usuario) {
        try {
            const [resultado] = await pool.query('INSERT INTO Usuarios (nombre, usuario, contraseña)  VALUES (?, ?, ?)', [usuario.nombre, usuario.usuario, usuario.password]);
            const [r] = await pool.query('INSERT INTO Config (id_usuario) VALUES (?)', [resultado.insertId]);
            return resultado;
        }
        catch (error) {
            console.error('Error al registrar un Cuidador: ', error);
            throw error;
        }
    }

    async realcionCuidador(usuarioId, cuidadorId){
        try{
            const [resultado] = await pool.query('INSERT INTO Cuidadores_usu (Id_cuidador, Id_usuario)  VALUES (?, ?)', [cuidadorId, usuarioId]);
            return resultado;
        }
        catch(error){
            console.error('Error al vincular un usuario a un cuidador: ', error);
            throw error;
        }
    }
};



module.exports = UsuariosDao;