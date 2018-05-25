

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
    $('#skuMaintenanceData').DataTable({
        "ajax": '../sku-maintenance/js/skuMaintenanceData.json',
        columns: [
            { data: 'carePakType' },
            { data: 'carePakSku' },
            { data: 'carePakSkuName' },
            { data: 'company' },
            { data: 'productGroup' },
            { data: 'productCode' },
            { data: 'level2Code' },
            { data: 'dataRecovery' },
            { data: 'prefix' },
            { data: 'term' },
            { data: 'edit' },
        ],
        initComplete: function( settings, json ) {
            loaded();
        },
        searchHighlight: true,
        lengthMenu: [ 10, 25 ],
        buttons: ['excel'],
        dom: 'lBfrtip',
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
    var dtButton = $("#skuMaintenanceData_wrapper").find($(".dt-buttons button")).detach();
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
function showEditSkuModal(carePakType, sku, skuName, productGroup, productCode, level2Code, dataRecovery, term, prefix) {
    $('.custom-modal__title').text('Edit SKU Information');
    // Assign the json values to the fields
    $("#carePakType").val(carePakType);
    $("#cpSku").val(sku);
    $("#cpSkuName").val(skuName);
    $("#productGroup").val(productGroup);
    $("#productCode").val(productCode);
    $("#level2Code").val(level2Code);
    if(dataRecovery) {
        $("#dataRecovery").val("Yes");
    } else {
        $("#dataRecovery").val("No");
    }
    $("#term").val(term);
    $("#prefix").val(prefix);

    // Show the overlay
    $(".overlay").css('display', 'block');
    $("#editSkuModal").css('display', 'block');
    $("#editSkuInfo").data('validator').resetForm();
}

//-------------------------------------------------
// ------------- Add SKU Dialog -------------------
function showAddSkuModal() {
    $("#carePakType").val('CarePAK Plus');
    $('.custom-modal__title').text('Add SKU Information');
    $(".overlay").css('display', 'block');
    $("#editSkuModal").css('display', 'block');
    $("#editSkuInfo").data('validator').resetForm();
}