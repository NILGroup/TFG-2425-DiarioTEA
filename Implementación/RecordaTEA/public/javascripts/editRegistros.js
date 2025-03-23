
$(document).ready(function () {


    $('#editar-btn-edit').click(function () {
        $('#fecha-edit').removeAttr('readonly').removeClass('no-editable');;
        $('#hora-edit').removeAttr('readonly').removeClass('no-editable');
        $('#editar-btn-edit').hide();
        $('#cancel-btn-edit').show();
    });

    $('#cancel-btn-edit').click(function(){
        $('#fecha-edit').addClass('no-editable').prop("readonly", true);
        $('#hora-edit').addClass('no-editable').prop("readonly", true);
        $('#editar-btn-edit').show();
        $('#cancel-btn-edit').hide();
    });

   

    







})