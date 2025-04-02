$(document).ready(function(){

    ajustarAlturas();

    function ajustarAlturas() {
        let maxHeight = Math.max($(".list-hora").outerHeight(), $(".list-contenido").outerHeight());
        $(".list-hora, .list-contenido").height(maxHeight);
    }
    sessionStorage.setItem("mes", $("#mes").val());

    $('#consultaMes').on('click', function(e){
        e.preventDefault();
        sessionStorage.setItem("recup", true);
        window.location.href = $(this).attr("href"); 
    });
});