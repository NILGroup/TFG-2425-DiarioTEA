var express = require('express');
const EntradasControlador = require('../controladores/entradasControlador');

const entradasControlador = new EntradasControlador();
var router = express.Router();

router.get('/', entradasControlador.cargarDiario);

router.get('/:dia', entradasControlador.cargarDia);

module.exports = router;