

//-------------------------------------------------
//---------------- DataTable Rules ----------------
$(document).ready(function() {
    $('#promotionMaintenanceData').DataTable({
        "ajax": '../promotion-maintenance/js/promotionMaintenanceData.json',
        columns: [
            { data: 'productSku' },
            { data: 'productName' },
            { data: 'productModel' },
            { data: 'order' },
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
            targets: [3],
            orderable: true,
            visible: false
        },
        { 
            className: "dt-center", 
            targets: [4,5,6,8,9]
        },]
    });

    //-------------------------------------------------
    //----------- Add Promotion Validation ------------
    var validateAddPromo = $("#addPromotionInfo").validate({
        debug: true,
        rules: {
            carePakType: {
                required: true
            }
        },
        submitHandler: function(form) {
            addNewPromotionRow();
            closeModal();
        }
    });

    //-------------------------------------------------
    // --------------- Add SKU Row --------------------
    function addNewPromotionRow() {

        var table = $('#promotionMaintenanceData').DataTable();
        var rowNode = table.row.add({
            "productName": newProductName.value,
            "productSku": newProductSku.value,
            "productModel": newProductModel.value,
            "order": -1,
            "carePakSku": newcpSku.value,
            "carePakType": newcpType.value,
            "carePakPeriod": newcpPeriod.value,
            "startDate": newStartDate.value,
            "endDate": newEndDate.value,
            "registrationPeriod": newRegistrationPeriod.value,
            "edit": '<a href="#" onclick="showAddPromotionModal(' + '\'' + `${newProductName.value}` + '\'' + ', ' + `${newProductSku.value}` + ', \'' + `${newProductModel.value}` + '\'' + ')">EDIT</a>',
        }).draw(false).order([3, 'asc']).draw().nodes().to$().addClass('activated');
        
        // ------ Remove Class So Only New Row Animates ------------
        var newRow = document.getElementsByClassName('activated')[0];
        newRow.addEventListener("animationend", removeAnimation, false);
        function removeAnimation() {
            newRow.classList.remove('activated');
          }
    }

    //-------------------------------------------------
    // ----------- Init Date Pickers ------------------
    $("#startDate").datepicker();
    $("#newStartDate").datepicker('setDate', new Date());
    $("#endDate").datepicker();
    $("#newEndDate").datepicker('setDate', "+3m");

    //---------------------------------------------
}); //  --------- / doc.ready ---------------------
    //---------------------------------------------


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
   // $("#editPromotionInfo").data('validator').resetForm();
}

//-------------------------------------------------
// ------------- Add Promotion Dialog -------------------
function showAddPromotionModal() {
    $('.custom-modal__title').text('Add Promotion');
    // Show the overlay
    $(".overlay").css('display', 'block');
    $("#addPromotionModal").css('display', 'block');
   // $("#editPromotionInfo").data('validator').resetForm();
}