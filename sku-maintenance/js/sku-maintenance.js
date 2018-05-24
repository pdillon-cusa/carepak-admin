

//-------------------------------------------------
//---------------- Form Validation ----------------
$().ready(function() {
    var validator = $("#editSkuInfo").validate({
        debug: true,
        rules: {
            cpType: {
                required: true,
                minlength: 6,
                maxlength: 50
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
        dom: 'Bfrtip',
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


// ------------- Edit SKU Dialog -------------------
function showEditSkuModal(sku, skuName, productGroup, productCode, level2Code, dataRecovery, term, prefix) {

    // Assign the json values to the fields
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
    $("#editInfoModal").css('display', 'block');
}

// ------------- Add SKU Dialog -------------------
function showAddSkuModal() {
    $(".overlay").css('display', 'block');
    $("#editInfoModal").css('display', 'block');
}