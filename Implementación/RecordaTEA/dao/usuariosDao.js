class UsuariosDao{
    constructor(pool) {
        this.pool = pool;
    }

    async leerUsuarioId(id){
        try{
            const resultado = await this.pool.query('SELECT * FROM Usuarios WHERE id = ?', [id]);
            return resultado[0];
        }
        catch(error){
            console.error('Error al buscar usuario por ID: ', error);
            throw error;
        }
    }
}