var express = require('express');
const EntradasControlador = require('../controladores/entradasControlador');

const entradasControlador = new EntradasControlador();
var router = express.Router();

// Este es para la persona con TEA
router.get('/', entradasControlador.redirectToDiary);

router.get("/add-entrada", entradasControlador.addEntry);

router.post('/submit-entry', entradasControlador.submitEntrada);

router.get('/view-entry/:idEntrada', entradasControlador.viewEntry);

// Este para la persona cuidadora
router.get('/:id', entradasControlador.cargarDiario);

router.get('/dia/:dia', entradasControlador.cargarDia);





module.exports = router;