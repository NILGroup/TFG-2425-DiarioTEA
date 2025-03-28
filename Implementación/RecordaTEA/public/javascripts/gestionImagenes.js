$(document).ready(function () {
    let cropper;
    var modal = new bootstrap.Modal(document.getElementById('recorta-img'));

    $('#imagenSeleccionada').on('change', function (e) {
        let image = e.target.files[0];

        if (image) {
            $("#nombreArchivo").text(image.name);

            const reader = new FileReader();

            reader.onload = function (event) {
                
                $("#imagenRecortable").attr("src", event.target.result);
                modal.show(); 
            }

            reader.readAsDataURL( e.target.files[0]);
        }
        $(this).val('');
    });

    $('#recorta-img').on('shown.bs.modal', function () {
        if (cropper) cropper.destroy();

        cropper = new Cropper(document.getElementById("imagenRecortable"), {
            aspectRatio: 1,
            viewMode: 1,
            background: false,
            autoCropArea: 1,
            movable: true,
            rotatable: true,
            scalable: false,
            zoomable: true,
            minCropBoxWidth: 500,
            minCropBoxHeight: 500,
            cropBoxResizable: false,
            responsive: true
        });

    });
});
