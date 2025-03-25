var express = require('express');
var router = express.Router();
const UsuariosController = require('../controladores/usuariosControlador')
const controllerUsuarios = new UsuariosController();
const RutinasController = require('../controladores/rutinasControlador')
const controllerRutinas = new RutinasController();


router.get('/', controllerUsuarios.leerUsuarioId);

router.get('/diary', controllerUsuarios.redirectToDiary);

router.get('/routines', controllerRutinas.getUserRutinas);

router.get("/add-entry", controllerUsuarios.addEntry);

router.get('/diary/view-entry/:idEntrada', controllerUsuarios.viewEntry);

router.get('/diary/edit-entry/:idEntrada', controllerUsuarios.editEntryView);

router.post('/submit-entry', controllerUsuarios.submitEntry);

router.post('/submit-edit-entry', controllerUsuarios.submitEditEntry);

router.post('/login', controllerUsuarios.login);

router.get('/routines/:idRutina', controllerRutinas.getTarjetasByIdRutina);



module.exports = router;
