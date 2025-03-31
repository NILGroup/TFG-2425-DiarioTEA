function renderImage(i) {
    if (i.imagen) {
        let imagenBase64 = i.imagen.toString('base64');
        return 'data:' + i.mimetype + ';base64,' + imagenBase64;
    }
    return null;
}

module.exports = { renderImage };