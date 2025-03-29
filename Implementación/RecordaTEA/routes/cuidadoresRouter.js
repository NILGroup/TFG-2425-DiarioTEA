var express = require('express');
var router = express.Router();
const CuidadoresController = require('../controladores/cuidadoresControlador');
const cuidadoresControlador = new CuidadoresController();

router.post('/nuevo-usuario', cuidadoresControlador.registro);

router.get('/inicio', cuidadoresControlador.inicio);

router.get('/logout', cuidadoresControlador.logout);

router.post('/compartir-usuario', cuidadoresControlador.compartirPerfil);

module.exports = router;
