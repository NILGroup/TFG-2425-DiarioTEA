$(document).ready(function () {
    let cropper;
    var modal = new bootstrap.Modal(document.getElementById('recorta-img'));
    var img;
    const tiposValidos = ["image/jpeg", "image/png", "image/webp"];

    $('#imagenSeleccionada').on('change', function (e) {
        let image = e.target.files[0];

        if (image) {
            if (!tiposValidos.includes(image.type)) {
                alert("Solo se permiten imágenes (JPG, PNG, WEBP).");
                this.value = ""; // Borra la selección del archivo
                return;
            }

            $("#nombreArchivo").text(image.name);

            const reader = new FileReader();

            reader.onload = function (event) {

                $("#imagenRecortable").attr("src", event.target.result);
                modal.show();
            }

            reader.readAsDataURL(e.target.files[0]);
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

    $('#recortar-img').on('click', function () {
        if (!cropper) return;

        img = cropper.getCroppedCanvas({
            width: 500,
            height: 500
        });

        img.toBlob(function (blob) {
            const url = URL.createObjectURL(blob);
            $("#preview-image").attr("src", url);
            $("#btn-subir").show();
        });

        $("#recorta-img").modal("hide");
    });

    $('#btn-subir').on('click', function (e) {
        e.preventDefault();

        const inputFile = $('#imagenSeleccionada')[0].files[0];
        const fileName = inputFile ? inputFile.name : 'imagen_recortada.jpg';

        let formData = new FormData();
        img.toBlob(function (blob) {
            formData.append('image', blob, fileName);
            $.ajax({
                url: '/tarjetas-comunicacion/nueva-imagen',
                method: 'POST',
                data: formData,
                contentType: false,
                processData: false,
                success: function (response) {
                    if(response > 0){
                        
                    }
                },
                error: function () {
    
                }
            });
        });

    });
});
