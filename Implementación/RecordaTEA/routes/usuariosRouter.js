var express = require('express');
var router = express.Router();
const UsuariosController = require('../controladores/usuariosControlador')
const controllerUsuarios = new UsuariosController();
const RutinasController = require('../controladores/rutinasControlador')
const controllerRutinas = new RutinasController();
const upload = require('../config/configMulter');


router.get('/', controllerUsuarios.leerUsuarioId);

router.post('/login', controllerUsuarios.login);

router.post('/nuevo-usuario',  upload.single('image'), controllerUsuarios.registro);

router.get('/logout', controllerUsuarios.logout);

module.exports = router;
