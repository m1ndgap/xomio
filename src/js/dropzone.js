Dropzone.autoDiscover = false;

$(document).ready(function () {
    let previewNode = $('[data-element="dropzone-template"]');
    let previewTemplate = previewNode.html();
    previewNode.parent().html('');

    $('[data-dropzone-block]').dropzone({
        maxFiles: 10,
        maxFilesize: 10,
        url: "/ajax_file_upload_handler/",
        previewTemplate: previewTemplate,
        autoQueue: false, // Make sure the files aren't queued until manually added
        previewsContainer: '[data-element="dropzone-previews"]', // Define the container to display the previews
        clickable: '[data-element="dropzone-trigger"]', // Define the element that should be used as click trigger to select files.
        dictFileTooBig: 'File is over 10 Мb',
        success: function (file, response) {
            $(file.previewElement).find('[data-dz-uploadprogress]').parent().hide();
        },
        error: function (file, response) {
            let item = $(file.previewElement);
            let itemError = $(file.previewElement).find('[data-dz-errormessage]');
            let itemName = $(file.previewElement).find('[data-dz-name]');

            if (file && response) {
                item.addClass('has-error');
                itemName.hide();
                itemError.html(response)
            } else {
                item.removeClass('has-error');
                itemName.show();
                itemError.html('')
            }
        },
        uploadprogress: function(progress) {
            $(file.previewElement).find('[data-dz-uploadprogress]').css('width', progress + '%');
        },
    });
});