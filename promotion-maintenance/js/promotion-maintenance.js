

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
       // retrieve: true,
        bFilter: false, 
        bInfo: false,
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
    //----------- Edit Promotion Validation -----------
    var validateEditPromo = $("#editPromotionInfo").validate({
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
            "edit": '<a href="#"  onclick="showEditPromotionModal(' + '\'' + `${newProductSku.value}` + '\'' + ', \'' + `${newProductName.value}` + '\' , \'' + `${newProductModel.value}` + '\'' + ', \'' + `${newcpSku.value}` + '\'' + ', \'' +  `${newcpType.value}` + '\''  + ', \'' + `${newcpPeriod.value}` + '\'' + ', ' + '\'' +  `${newStartDate.value}` + '\' , \'' + `${newEndDate.value}` + '\', \'' + `${newRegistrationPeriod.value}` + '\'' + ')">EDIT</a>',
        }).draw(false).order([3, 'asc']).draw().nodes().to$().addClass('activated');
        
        removeAnimationClass();
    }

    //-------------------------------------------------
    // ---- Remove Class So Only New Row Animates -----
    function removeAnimationClass() {
        var active = document.querySelector('.activated');
        active.addEventListener("animationend", removeAnimation, false);
        function removeAnimation() {
            $('.activated').removeClass('activated');
        }
    }

    //-------------------------------------------------
    // ----------- Init Date Pickers ------------------
    $(function() {
        var today = new Date();
        var currMonth = today.getMonth();
        var currYear = today.getFullYear();
        var currDay = today.getDay();
        var startDate = new Date(currYear, currMonth - 2, currDay - 8);
        var setEndDate = new Date(currYear, currMonth - 2, currDay - 8);
        $("#startDate").datepicker({
            'setDate': new Date(), 
            startDate: new Date(),
            maxDate: today,
            defaultDate: today,
            todayHighlight: true
        }).datepicker('setDate',today );

        $("#endDate").datepicker({
            'setDate': new Date(), 
            startDate: new Date(),
            maxDate: today,
            defaultDate: today,
            todayHighlight: true
        }).datepicker('setDate', setEndDate ); 

        $("#newStartDate").datepicker({
            'setDate': new Date(), 
            startDate: new Date(),
            maxDate: today,
            defaultDate: today,
            todayHighlight: true
        }).datepicker('setDate', today ); 

        $("#newEndDate").datepicker({
            'setDate': new Date(), 
            startDate: new Date(),
            maxDate: today,
            defaultDate: today,
            todayHighlight: true
        }).datepicker('setDate', setEndDate ); 
    });

    //---------------------------------------------
}); //  --------- / doc.ready ---------------------
    //---------------------------------------------


//-------------------------------------------------
// --------- Edit Promotion Dialog ----------------

function showEditPromotionModal(productSku, productName, productModel, carePakSku, carePakType, carePakPeriod, startDate, endDate, registrationPeriod) {
    // Rest form of previous values
    $("#editPromotionInfo")[0].reset();
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
}

function saveChanges() {
    // var data = table.row(row_id).data();
        // data-row-id="' + '\'' + `${newProductSku.value}` + '\'' + '"

}

//-------------------------------------------------
// ------------- Search Modal -------------------
function showSearchModal() {
    // Show the overlay
    $(".overlay").css('display', 'block');
    $("#showSearchModal").css('display', 'block');
}

//-------------------------------------------------
// ------------- Add Promotion Dialog -------------
function showAddPromotionModal() {
    // Rest form of previous values
    $("#addPromotionInfo")[0].reset();
    // Init dates for convenience
    $("#newStartDate").datepicker('setDate', new Date());
    $("#newEndDate").datepicker('setDate', "+3m");
    // Show the overlay
    $(".overlay").css('display', 'block');
    $("#addPromotionModal").css('display', 'block');
}