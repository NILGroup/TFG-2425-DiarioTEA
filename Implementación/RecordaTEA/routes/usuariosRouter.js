var express = require('express');
var router = express.Router();
const UsuariosController = require('../controladores/usuariosControlador')
const controller = new UsuariosController();


router.get('/', controller.leerUsuarioId);

router.get('/diary', controller.redirectToDiary);

//router.get('/routines', controller.);

router.get("/add-entry", controller.addEntry);

router.get('/diary/view-entry/:idEntrada', controller.viewEntry);

router.post('/submit-entry', controller.submitEntry);




module.exports = router;
