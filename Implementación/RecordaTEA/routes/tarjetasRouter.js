var express = require('express');
const upload = require('../config/configMulter');

const TarjetasControlador = require('../controladores/tarjetasControlador');

var router = express.Router();
const tarjetasControlador = new TarjetasControlador();

router.get('/', tarjetasControlador.vocabularioUsuarioId);

router.get('/arasaac', (req, res) => {
  tarjetasControlador.consultaArasaac(req, res);
});

router.get('/pagina', (req, res) => {
  tarjetasControlador.pasarPagina(req, res);
});

router.post('/picto-vocabulario', tarjetasControlador.addTarjetaVocabulario);

router.delete('/eliminar-picto', tarjetasControlador.eliminarTarjetaVocabulario);

router.post('/nueva-imagen', upload.single('image'), tarjetasControlador.addTarjetaImagen);


module.exports = router;