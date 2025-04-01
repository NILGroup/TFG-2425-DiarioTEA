$(document).ready(function () {


    const currentYear = new Date().getFullYear();
    const startYear = '2000';

    $('#anio').datepicker({
        format: "yyyy", 
        startView: "years",  
        minViewMode: "years",  
        startDate: startYear, 
        endDate: currentYear + '-12-31',
        autoclose: true
    }).datepicker("setDate", currentYear + "-01-01");

    const currentMonth = new Date().getMonth() + 1;  
    $('#mes').val(currentMonth);

    ajustarAlturas();

    function ajustarAlturas() {
        let maxHeight = Math.max($(".list-dia").outerHeight(), $(".list-contenido").outerHeight());
        $(".list-dia, .list-contenido").height(maxHeight);
    }

});