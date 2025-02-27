var express = require('express');
var router = express.Router();
const UsuariosController = require('../controladores/usuariosControlador')
const controller = new UsuariosController();


router.get('/', function (req, res){controller.leerUsuarioId(req, res)});

module.exports = router;
