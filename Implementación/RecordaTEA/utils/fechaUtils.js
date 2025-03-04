function fechaCompleta(fecha) {
    let f = new Date(fecha);
    let param = { day: 'numeric', month: 'long', year: 'numeric' };
    return f.toLocaleDateString('es-ES', param);
}

function mesAbreviatura(fecha) {
    let f = new Date(fecha);
    let param = { month: 'short' };
    return f.toLocaleDateString('es-ES', param);
}

function dia(fecha){
    const f = new Date(fecha);
    let param = {day: 'numeric'};
    return f.toLocaleDateString('es-ES', param);
}

function esHoy(fecha) {
    let hoy = new Date();
    let f = new Date(fecha);
  
    return ( f.getDate() === hoy.getDate() && f.getMonth() === hoy.getMonth() && f.getFullYear() === hoy.getFullYear());
  }

  function fechaSinHora(fecha) {
    let f = new Date(fecha.getTime() - fecha.getTimezoneOffset() * 60000); 
    return f.toISOString().split('T')[0];
}

function horaMinutos(fecha){
    let f = new Date(fecha.getTime() - fecha.getTimezoneOffset() * 60000); 
    let hora = f.toISOString().split('T')[1];
    let [h, m] = hora.split(':');
    return h +':' + m;
}

module.exports = {
    fechaCompleta,
    mesAbreviatura,
    dia,
    esHoy,
    fechaSinHora,
    horaMinutos
};