$(document).ready(function(){

    ajustarAlturas();

    function ajustarAlturas() {
        let maxHeight = Math.max($(".list-dia").outerHeight(), $(".list-contenido").outerHeight());
        $(".list-dia, .list-contenido").height(maxHeight);
    }
});