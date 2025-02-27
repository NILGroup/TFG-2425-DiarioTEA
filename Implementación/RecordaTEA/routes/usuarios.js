var express = require('express');
var router = express.Router();
const UsuariosController = require('../controladores/usuariosControlador')
const controller = new UsuariosController();


router.get('/', controller.leerUsuarioId);

module.exports = router;
