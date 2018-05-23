// $(document).ready(function() {
//     $('#example').DataTable({
//         lengthMenu: [ 10, 25 ],
//         columnDefs: [{
//             targets  : 'no-sort',
//             orderable: false,
//             order: []
//     }],
//     initComplete: function( settings, json ) {
//             loaded();
//         }
//     });
// });

$(document).ready(function() {
    $('#skuMaintenanceData').DataTable({
        "ajax": '../sku-maintenance/js/skuMaintenanceData.json',
        columns: [
            { data: 'sku' },
            { data: 'carePakSkuName' },
            { data: 'company' },
            { data: 'productGroup' },
            { data: 'productCode' },
            { data: 'level2Code' },
            { data: 'dataRecovery' },
            { data: 'prefix' },
            { data: 'term' },
            { data: 'checked'}
        ],
        initComplete: function( settings, json ) {
            loaded();
        },
        searchHighlight: true,
        columnDefs: [{
            render: function (data, type, row) {
                return (data === true) ? '<input type="checkbox" class="send-email" checked>' : '<input type="checkbox"  class="send-email">';
            },
            targets: 9
        },
        { lengthMenu: [ 10, 25 ] },
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
