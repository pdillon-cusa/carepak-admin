$(document).ready(function() {

    //-------------------------------------------------
    //---------------- Form Validation ----------------
    var validateAddSku = $("#addSkuInfo").validate({
        debug: true,
        rules: {
            newcpType: {
                required: true
            },
            newcpSku: {
                required: true,
                minlength: 6
            },
            newcpSkuName: {
                required: true
            },
            newProductGroup: {
                required: true
            },
            newProductCode: {
                required: true
            },
            newLevel2Code: {
                required: true
            },
            newDataRecovery: {
                required: true
            },
            newPrefix: {
                required: true
            },
            newTerm: {
                required: true
            }
        },
        submitHandler: function(form) {
            addNewSkuRow();
            closeModal();
        }
    });

    //-------------------------------------------------
    //---------------- DataTable Rules ----------------
    let d = new Date();
    let strDate = 'CarePAK SKU Data ' + (d.getMonth()+1) + "-" + d.getDate()  + "-" + d.getFullYear();
    $('#skuMaintenanceData').DataTable({
        "ajax": '../sku-maintenance/js/skuMaintenanceData.json',
        columns: [
            { data: 'carePakType' },
            { data: 'carePakSku' },
            { data: 'carePakSkuName' },
            { data: 'order' },
            { data: 'productGroup' },
            { data: 'productCode' },
            { data: 'level2Code' },
            { data: 'dataRecovery' },
            { data: 'prefix' },
            { data: 'term' },
            { data: 'startDate' },
            { data: 'edit' },
        ],
        initComplete: function( settings, json ) {
            loaded();
        },
        order: [ 3, "asc" ],
        searchHighlight: true,
        lengthMenu: [ 10, 25 ],
        dom: 'lBfrtip',
        buttons: [
            {
                extend: 'excelHtml5',
                title: strDate,
                exportOptions: {
                    columns: [ 0,1,2,3,4,5,6,7,8,9 ]
                }
            }
        ],
        columnDefs: [
            {
                targets : 'no-sort',
                orderable: false,
                order: []
            },
            {
                targets: [3],
                orderable: true,
                visible: false
            },
            { 
                className: "dt-center"
            }
        ]
    });

    //-------------------------------------------------
    // ------- Move Initial Export Excel Button -------
    let dtButton = $("#skuMaintenanceData_wrapper").find($(".dt-buttons button")).detach();
    if(dtButton) {
        var buttonDiv = $(".section-head").find($(".section-head__actions"));
        dtButton.addClass('button');
        dtButton.text('Export Excel');
        dtButton.removeClass('dt-button buttons-excel buttons-html5');
        dtButton.appendTo(buttonDiv);
    }

    //-------------------------------------------------
    // --------------- Add SKU Row --------------------
    function addNewSkuRow() {
        $('#skuMaintenanceData').DataTable().row.add({
            "carePakType": newcpType.value,
            "carePakSku": newcpSku.value,
            "carePakSkuName": newcpSkuName.value,
            "order": 0,
            "productGroup": newProductGroup.value,
            "productCode": newProductCode.value,
            "level2Code": newLevel2Code.value,
            "dataRecovery": newDataRecovery.value,
            "prefix": newPrefix.value,
            "term": newTerm.value,
            "startDate": newStartDate.value,
            "edit": '<a href="#" onclick="showEditSkuModal(' + '\'' + `${newcpType.value}` + '\'' + ', ' + `${newcpSku.value}` + ', \'' + `${newcpSkuName.value}` + '\'' + ', \'' + `${newProductGroup.value}` + '\'' + ', \'' + `${newProductCode.value}` + '\''  + ', \'' + `${newLevel2Code.value}` + '\'' + ', ' + '\'' + `${newDataRecovery.value}` + '\' , ' + `${newPrefix.value}` + ', \'' + `${newTerm.value}` + '\'' + ', \'' + `${newStartDate.value}` + '\'' + ')">EDIT</a>',
        }).draw().order([3, 'asc']);
    }
    //-------------------------------------------------

    $("#startDate").datepicker();
    $("#newStartDate").datepicker();


    //---------------------------------------------
}); //  --------- / doc.ready ---------------------
    //---------------------------------------------


//-------------------------------------------------
// ------------- Edit SKU Dialog ------------------
function showEditSkuModal(carePakType, cpSku, cpSkuName, productGroup, productCode, level2Code, dataRecovery, prefix, term, startDate) {
    $('.custom-modal__title').text('Edit SKU Information');

    // Assign the json values to the fields -------------
    $("#carePakType").val(carePakType);
    $("#cpSku").val(cpSku);
    $("#cpSkuName").val(cpSkuName);
    $("#productGroup").val(productGroup);
    $("#productCode").val(productCode);
    $("#level2Code").val(level2Code);
    if(dataRecovery) {
        $("#dataRecovery").val("Yes");
    } else {
        $("#dataRecovery").val("No");
    }
    $("#prefix").val(prefix);
    $("#term").val(term);
    $("#startDate").val(startDate);
    
    // Show the overlay ---------------------------------
    $(".overlay").css('display', 'block');
    $("#editSkuModal").css('display', 'block');
    // $("#editSkuInfo").data('').resetForm();
}


//-------------------------------------------------
// ------------- Add SKU Dialog -------------------
// ------- (Same HTML Not populated) --------------
function showAddSkuModal() {
    $(".overlay").css('display', 'block');
    $("#addSkuModal").css('display', 'block');
   // $("#addSkuModal").data('validateAddSku').resetForm();
}


