

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
function showEditSkuModal(sku) {
    $("#cpSku").val(sku);
    $(".overlay").css('display', 'block');
    $("#editInfoModal").css('display', 'block');
}