var express = require('express');
var router = express.Router();
const RutinasController = require('../controladores/rutinasControlador');
const rutinasControlador = new RutinasController();

router.get('/', rutinasControlador.getCuidadoresRutinas);
router.get('/addRutina',rutinasControlador.addRutina);
router.post('/submit', rutinasControlador.submitRutina);
router.get('/mis-rutinas', rutinasControlador.getUserRutinas);
router.get("/mis-rutinas/:idRutina", rutinasControlador.getTarjetasByIdRutina);
router.get("/:idRutina", rutinasControlador.getTarjetasByIdRutinaCuidador);

module.exports = router;
