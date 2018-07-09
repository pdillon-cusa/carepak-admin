$(document).ready(function() {

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
            { data: 'level2Code' },
            { data: 'dataRecovery' },
            { data: 'prefix' },
            { data: 'term' },
            { data: 'waitingPeriod' },
            { data: 'edit' },
        ],
        initComplete: function( settings, json ) {
            loaded();
        },
        orderClasses: false,
        iDisplayLength: 25,
        searchHighlight: true,
        lengthMenu: [ 10, 25 ],
        dom: 'lBfrtip',
        buttons: [{
            extend: 'excelHtml5',
            title: strDate,
            exportOptions: {
                columns: [ 0,1,2,3,4,5,6,7,8,9 ]
            }
        }],
        columnDefs: [{
            targets : 'no-sort',
            orderable: false,
            order: []
        },
        {
            render: function (data, type, row) {
                return (data === true) ? 'Yes' : 'No';
            },
            targets: 7
        },
        {
            targets: [3],
            orderable: true,
            visible: false
        },
        { 
            className: "dt-center"
        },
        { 
            targets: [0,1,2,3,4,5,6,7,8,9],
            createdCell: function (td, cellData, rowData, row, col) {
                $.each($(td, row), function () {
                    $(this).attr('title', cellData);
                });
            }
        }]
    });

    //-------------------------------------------------
    //-------------- Search By Column -----------------
    var table = $('#skuMaintenanceData').DataTable();
    $('#carePakSku').on('keyup', function() {
        table
            .column(1)
            .search(this.value)
            .draw();
    });

    //-------------------------------------------------
    //-------------- Add SKU Validation ---------------
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
    //--------------- Edit SKU Validation ----------------
    var validateEditSku = $("#editSkuInfo").validate({
        debug: true,
        rules: {
            carePakType: {
                required: true
            },
            cpSku: {
                required: true,
                minlength: 6
            },
            cpSkuName: {
                required: true
            },
            productGroup: {
                required: true
            },
            level2Code: {
                required: true
            },
            dataRecovery: {
                required: true
            },
            prefix: {
                required: true
            },
            term: {
                required: true
            },
            waitingPeriod: {
                required: true
            }
        },
        submitHandler: function(form) {
            closeModal();
        }
    });


    //-------------------------------------------------
    // --------- Move 'Export Excel' Button -----------
    let dtButton = $("#skuMaintenanceData_wrapper").find($(".dt-buttons button")).detach();
    if(dtButton) {
        var buttonDiv = $(".section-head").find($(".section-head__actions"));
        dtButton.addClass('button info');
        dtButton.text('Export Excel');
        dtButton.removeClass('dt-button buttons-excel buttons-html5');
        dtButton.appendTo(buttonDiv);
    }

    //-------------------------------------------------
    // --------------- Add SKU Row --------------------
    function addNewSkuRow() {

        var table = $('#skuMaintenanceData').DataTable();
        var rowNode = table.row.add({
            "carePakType": newcpType.value,
            "carePakSku": newcpSku.value,
            "carePakSkuName": newcpSkuName.value,
            "order": -1,
            "productGroup": newProductGroup.value,
            "level2Code": newLevel2Code.value,
            "dataRecovery": newDataRecovery.value,
            "prefix": newPrefix.value,
            "term": newTerm.value,
            "waitingPeriod": newWaitingPeriod.value,
            "edit": '<a href="#" onclick="showEditSkuModal(' + '\'' + `${newcpType.value}` + '\'' + ', ' + `${newcpSku.value}` + ', \'' + `${newcpSkuName.value}` + '\'' + ', \'' + `${newProductGroup.value}` + '\'' + ', \'' + `${newLevel2Code.value}` + '\'' + ', ' + '\'' + `${newDataRecovery.value}` + '\' , \'' + `${newPrefix.value}` + '\'' + ', \'' + `${newTerm.value}` + '\'' + ', \'' + `${newWaitingPeriod.value}` + '\'' + ')">EDIT</a>',
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


    //---------------------------------------------
}); //  --------- / doc.ready ---------------------
    //---------------------------------------------


//-------------------------------------------------
// ------------- Edit SKU Dialog ------------------
function showEditSkuModal(carePakType, cpSku, cpSkuName, productGroup, level2Code, dataRecovery, prefix, term, waitingPeriod) {

    // Assign the json values to the fields -------------
    $("#carePakType").val(carePakType);
    $("#cpSku").val(cpSku);
    $("#cpSkuName").val(cpSkuName);
    $("#productGroup").val(productGroup);
    $("#level2Code").val(level2Code);
    if(dataRecovery) {
        $("#dataRecovery").val("Yes");
    } else {
        $("#dataRecovery").val("No");
    }
    $("#prefix").val(prefix);
    $("#term").val(term);
    $("#waitingPeriod").val(waitingPeriod);
    
    // Show the overlay ---------------------------------
    $(".overlay").css('display', 'block');
    $("#editSkuModal").css('display', 'block');
    // $("#editSkuInfo").data('').resetForm();
}

//-------------------------------------------------
// ------------- Search Modal -------------------
function showSearchModalSku() {
    $('#carePakSku').val('');
    // Show the overlay
    $(".overlay").css('display', 'block');
    $("#searchModalSku").css('display', 'block');
}

//-------------------------------------------------
// ------------- Add SKU Dialog -------------------
function showAddSkuModal() {
    $(".overlay").css('display', 'block');
    $("#addSkuModal").css('display', 'block');
   // $("#addSkuModal").data('validateAddSku').resetForm();
}

//-------------------------------------------------
// ------------- Cancel Search -------------------
function cancelSearch() {
    var table = $('#skuMaintenanceData').DataTable();
    table
        .search( '' )
        .columns().search( '' )
        .draw();
    closeModal();
}