function verificarRol(req, res, next) {
    if (!req.session.cuidador) {
        const err = new Error('No tienes permiso para acceder a esta página.');
        err.status = 403;
        return next(err);
    }
    next();
}
module.exports = verificarRol;