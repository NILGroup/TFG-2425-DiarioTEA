var express = require('express');
var router = express.Router();
const CuidadoresController = require('../controladores/cuidadoresControlador');
const cuidadoresControlador = new CuidadoresController();

router.get('/', cuidadoresControlador.login);

module.exports = router;
