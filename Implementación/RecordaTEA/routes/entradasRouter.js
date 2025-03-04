var express = require('express');
const EntradasControlador = require('../controladores/entradasControlador');

const entradasControlador = new EntradasControlador();
var router = express.Router();

router.get('/', entradasControlador.cargarDiario);

module.exports = router;