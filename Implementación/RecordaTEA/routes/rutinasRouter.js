var express = require('express');
var router = express.Router();
const RutinasController = require('../controladores/rutinasControlador');
const rutinasControlador = new RutinasController();

router.get('/', rutinasControlador.getCuidadoresRutinas);

module.exports = router;
