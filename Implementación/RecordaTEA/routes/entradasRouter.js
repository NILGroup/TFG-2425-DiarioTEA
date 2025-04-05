var express = require('express');
const EntradasControlador = require('../controladores/entradasControlador');

const entradasControlador = new EntradasControlador();
var router = express.Router();

// Este es para la persona con TEA
router.get('/', entradasControlador.redirectToDiary);

router.get("/add-entrada", entradasControlador.addEntry);

router.post('/submit-entry', entradasControlador.submitEntrada);

router.post('/submit-edit-entry', entradasControlador.submitEditEntry);

router.get('/view-entry/:idEntrada', entradasControlador.viewEntry);

router.get('/delete-entry/:idEntrada', entradasControlador.eliminarEntrada);

router.get('/edit-entry/:idEntrada', entradasControlador.editEntryView);

// Este para la persona cuidadora
router.get('/dia/:dia', entradasControlador.cargarDia);

router.get('/actualizar-diario', entradasControlador.actualizarDiario);

router.get('/:id', entradasControlador.cargarDiario);





module.exports = router;