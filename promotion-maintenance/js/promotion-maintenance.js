

//-------------------------------------------------
//---------------- Form Validation ----------------
$().ready(function() {
    var validator = $("#editPromotionInfo").validate({
        debug: true,
        rules: {
            carePakType: {
                required: true
            }
        },
        submitHandler: function(form) {
            closeModal();
        }
    });
});

//-------------------------------------------------
//---------------- DataTable Rules ----------------
$(document).ready(function() {
    $('#promotionMaintenanceData').DataTable({
        "ajax": '../promotion-maintenance/js/promotionMaintenanceData.json',
        columns: [
            { data: 'productSku' },
            { data: 'productName' },
            { data: 'productModel' },
            { data: 'carePakSku' },
            { data: 'carePakType' },
            { data: 'carePakPeriod' },
            { data: 'startDate' },
            { data: 'endDate' },
            { data: 'registrationPeriod' },
            { data: 'edit' },
        ],
        initComplete: function( settings, json ) {
            loaded();
        },
        searchHighlight: true,
        lengthMenu: [ 10, 25 ],
        columnDefs: [
        {
            targets  : 'no-sort',
            orderable: false,
            order: []
        },
        { 
            className: "dt-center", 
            targets: [4,5,6,8,9]
        },]
    });
});

//-------------------------------------------------
// --------- Edit Promotion Dialog ----------------
function showEditPromotionModal(productSku, productName, productModel, carePakSku, carePakType, carePakPeriod, startDate, endDate, registrationPeriod) {
    $('.custom-modal__title').text('Edit Promotion');
    // Assign the json values to the fields
    $("#productSku").val(productSku);
    $("#productName").val(productName);
    $("#productModel").val(productModel);
    $("#carePakSku").val(carePakSku);
    $("#carePakType").val(carePakType);
    $("#carePakPeriod").val(carePakPeriod);
    $("#startDate").val(startDate);
    $("#endDate").val(endDate);
    $("#registrationPeriod").val(registrationPeriod);

    // Show the overlay
    $(".overlay").css('display', 'block');
    $("#editPromotionModal").css('display', 'block');
    $("#editPromotionInfo").data('validator').resetForm();
}

//-------------------------------------------------
// ------------- Add SKU Dialog -------------------
function showAddPromotionModal() {
    $('.custom-modal__title').text('Add Promotion');
    // Show the overlay
    $(".overlay").css('display', 'block');
    $("#editPromotionModal").css('display', 'block');
    $("#editPromotionInfo").data('validator').resetForm();
}