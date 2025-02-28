var express = require('express');
const TarjetasControlador = require('../controladores/tarjetasControlador');

var router = express.Router();
const tarjetasControlador = new TarjetasControlador();

router.get('/', tarjetasControlador.vocabularioUsuarioId);

router.get('/arasaac', tarjetasControlador.consultaArasaac);

module.exports = router;