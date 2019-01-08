//-------------------------------------------------
//---------------- Form Validation ----------------
$().ready(function() {
    var validator = $("#editCustomerInfo").validate({
        debug: true,
        rules: {
            serialNumber: {
                required: true,
                minlength: 6,
                maxlength: 50
            },
            firstName: {
                required: true,
                minlength: 1,
                maxlength: 50
            },
            lastName: {
                required: true,
                minlength: 1,
                maxlength: 50
            },
            emailAddress: {
                required: true,
                email: true
            },
            phone: {
                required: true,
                minlength: 9,
                maxlength: 10
            }
        },
        submitHandler: function(form) {
            closeModal();
        }
    });
});

//---------------- Date Picker Init -----------------
$(function() {
    var today = new Date();
    var currMonth = today.getMonth();
    var currYear = today.getFullYear();
    var currDay = today.getDay();
    var startDate = new Date(currYear, currMonth - 2, currDay - 8);
    // alert(startDate);
    $("#dateFrom").datepicker({
        endDate: '+0d'
    }).datepicker('setDate',startDate );
    
    $("#dateTo").datepicker({
        endDate: 'now'
    }).datepicker('setDate','now' );
});

// ------------- Edit Info Dialog -------------------
function showEditCustomerModal(serialNumber, firstName, lastName, emailAddress, editPhone) {

    $("#serialNumber").val(serialNumber);
    $("#firstName").val(firstName);
    $("#lastName").val(lastName);
    $("#emailAddress").val(emailAddress);
    $("#editPhone").val(editPhone);

    $(".overlay").css('display', 'block');
    $("#editInfoModal").css('display', 'block');
    $("#editCustomerInfo").data('validator').resetForm();
}

// ------------- View Receipt Dialog ----------------
function showReceiptModal() {
    $(".overlay").css('display', 'block');
    $("#viewReceiptModal").css('display', 'block');
}

// ----------- Send Email Dialog --------------------
function sendEmailDialog() {
    if ( $('input.send-email:checked').length == 0 ) {
        alert('Please select a CarePAK customer to email.')
    }
    else {
        $('#sendEmailModal').show();
        $(".overlay").css('display', 'block');
        // Bad ideas (like setTimeout) are for prototype usage only!
        setTimeout(function() {
            $('#resultText span').text('Email(s) sent sucessfully');
            $('#resultText').removeClass('waiting-ct');
            $('#resultText').addClass('response-success');
            $('#resultText span').removeClass('waiting');
        }, 4000);
        setTimeout(function() {
            $('#resultText span').text('Sending...');
            $('#sendEmailModal').fadeOut(200);
            $(".overlay").fadeOut(200);
            $('#resultText').addClass('waiting-ct');
            $('#resultText').removeClass('response-success');
            $('#resultText span').addClass('waiting');
        }, 6000);
    }
}

// ----------- Failed Email Dialog --------------------
function failedEmailDialog() {
    if ( $('input.send-email:checked').length == 0 ) {
        alert('Please select a CarePAK customer to email.')
    }
    else {
        $('#failedEmailModal').show();
        $(".overlay").css('display', 'block');
    }
}

//----------------------------------
//------- DataTable Rules ----------
$("#edit-customer-info").validate();

$(document).ready(function() {
    $('#activationSupportData').DataTable( {
        "ajax": '../activation-support/js/activationSupportData.json',
        columns: [
            { data: 'sellTo' },
            { data: 'dealerName' },
            { data: 'orderReceivedDate' },
            { data: 'purchaseDate' },
            { data: 'source' },
            { data: 'status' },
            { data: 'carePakSku' },
            { data: 'carePakName' },
            { data: 'hardwareSKU' },
            { data: 'hardwareModelName' },
            { data: 'serial' },
            { data: 'receipt' },
            { data: 'picture' },
            { data: 'term' },
            { data: 'expDate' },
            { data: 'activationCode' },
            { data: 'canonCpo' },
            { data: 'canonInvoice' },
            { data: 'firstName' },
            { data: 'lastName' },
            { data: 'email' },
            { data: 'phone' },
            { data: 'edit' },
            { data: 'checked' }
        ],
        initComplete: function( settings, json ) {
            $('#activationSupportData').colResizable({liveDrag:true});
            loaded();
        },
        orderClasses: false,
       // bAutoWidth : false,
        iDisplayLength: 25,
        searchHighlight: true,
        lengthMenu: [ 10, 25 ],
        columnDefs: [{
            render: function (data, type, row) {
                return (data === true) ? '<input type="checkbox" class="send-email" checked>' : '<input type="checkbox"  class="send-email">';
            },
            targets: 23
        },
        {
            targets  : 'no-sort',
            orderable: false,
            order: []
        },
        { 
            className: "dt-center", 
            targets: [12,13,22]
        },
        { 
            targets: [0,1,2,3,4,5,6,7,8,9,10,12,13,14,15,16,17,18,19,20,21],
            createdCell: function (td, cellData, rowData, row, col) {
                $.each($(td, row), function () {
                    $(this).attr('title', cellData);
                });
            }
        }]
    });


    //----------------------------------------------------
    //---------------- Column Picker Button --------------
    $(document).ready(function() {
        let toggler = $("#toggle-columns").detach();
        let tabler = $('#activationSupportData_wrapper');
        tabler.prepend(toggler);
        $('.toggle-vis').on( 'click', function (e) {    
            e.preventDefault();
            $('#activationSupportData').colResizable({ disable: true });
            var column = $('#activationSupportData').DataTable().column( $(this).attr('data-column'));
            column.visible( ! column.visible());
            $(this).find('i').toggleClass('icon-check-square icon-square');
            $(this).removeClass('wave');
            if( $(this).find('i').hasClass('icon-check-square') ) {
                $(this).addClass('wave');
            }
            $('#activationSupportData').colResizable({ liveDrag: true });
        });
    });    
    

    //----------------------------------------------------
    //--------------- Single Column Search ---------------
    var table = $('#activationSupportData').DataTable();
    $("#clearAll").keyup(function() {
        table
            .search( '' )
            .columns().search( '' )
            .draw();
    });

    $("#searchbox").keyup(function() {
        table.search(this.value).draw();
    });
    $('#lastNameSearch').on('keyup', function() {
        table
            .columns(19)
            .search(this.value)
            .draw();
    });
    $('#firstNameSearch').on('keyup', function() {
        table
            .columns(18)
            .search(this.value)
            .draw();
    });
    $('#carePakSkuSearch').on('keyup', function() {
        table
            .columns(6)
            .search(this.value)
            .draw();
    });
    $('#emailSearch').on('keyup', function() {
        table
            .columns(20)
            .search(this.value)
            .draw();
    });
    $('#phoneSearch').on('keyup', function() {
        table
            .columns(21)
            .search(this.value)
            .draw();
    });
    $('#serialSearch').on('keyup', function() {
        table
            .columns(10)
            .search(this.value)
            .draw();
    });
    $('#receiptSearch').on('keyup', function() {
        table
            .columns(11)
            .search(this.value)
            .draw();
    });
    $('#sellToSearch').on('keyup', function() {
        table
            .columns(0)
            .search(this.value)
            .draw();
    });

}); 
// ------------ / doc-ready ----------------

// ----- Ellipsis Column (Unused ATM) ------
$.fn.dataTable.render.ellipsis = function () {
    return function ( data, type, row ) {
        return type === 'display' && data.length > 10 ?
            data.substr( 0, 10 ) +'…' :
            data;
    }
};