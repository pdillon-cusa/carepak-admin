

//-------------------------------------------------
//---------------- Form Validation ----------------
$().ready(function() {
    var validator = $("#editSkuInfo, #addSkuModal").validate({
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
    let d = new Date();
    let strDate = 'CarePAK SKU Data ' + (d.getMonth()+1) + "-" + d.getDate()  + "-" + d.getFullYear();
    $('#skuMaintenanceData').DataTable({
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
        buttons: ['excel'],
        dom: 'lBfrtip',
        buttons: [
            {
                extend: 'excelHtml5',
                title: strDate
            }
        ],
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
// ------- Move Initial Export Excel Button -------
$(document).ready(function() {
    let dtButton = $("#skuMaintenanceData_wrapper").find($(".dt-buttons button")).detach();
    if(dtButton) {
        var buttonDiv = $(".section-head").find($(".section-head__actions"));
        dtButton.addClass('button');
        dtButton.text('Export Excel');
        dtButton.removeClass('dt-button buttons-excel buttons-html5');
        dtButton.appendTo(buttonDiv);
    }
});

//-------------------------------------------------
// ------------- Edit SKU Dialog ------------------
function showEditPromotionModal(productSku, productName, productModel, carePakSku, carePakType, carePakPeriod, startDate, endDate, registrationPeriod) {
    $('.custom-modal__title').text('Edit SKU Information');
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
// ------- (Same HTML Not populated) --------------
function showAddPromotionModal() {
    $("#carePakType").val('CarePAK Plus');
    $('.custom-modal__title').text('Add SKU Information');
    $(".overlay").css('display', 'block');
    $("#editSkuModal").css('display', 'block');
    $("#editSkuInfo").data('validator').resetForm();
}