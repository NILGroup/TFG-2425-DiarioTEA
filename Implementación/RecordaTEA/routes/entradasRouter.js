var express = require('express');
const EntradasControlador = require('../controladores/entradasControlador');

const entradasControlador = new EntradasControlador();
var router = express.Router();

router.get('/:id', entradasControlador.cargarDiario);

router.get('/dia/:dia', entradasControlador.cargarDia);

// Este es para la persona con TEA
router.get('/', entradasControlador.redirectToDiary);

module.exports = router;