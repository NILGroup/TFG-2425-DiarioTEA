$(document).ready(function(){

    ajustarAlturas();

    function ajustarAlturas() {
        let maxHeight = Math.max($(".list-hora").outerHeight(), $(".list-contenido").outerHeight());
        $(".list-hora, .list-contenido").height(maxHeight);
    }
});