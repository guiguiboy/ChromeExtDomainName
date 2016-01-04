/**
 * Created by gbretou on 16/12/2015.
 */

//Save
function save_config() {
    var values = [];

    $('#config tbody tr').each(function (i, tr) {
        var inputs = $(tr).find('input');
        values.push({domain: $(inputs[0]).val(), color: $(inputs[1]).val()});
    });

    chrome.storage.sync.set({
        values: values
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

//Restore
function restore_config() {
    chrome.storage.sync.get({
        values: []
    }, function(items) {
        $(items.values).each(function(i, value) {
            add(value.domain, value.color);
        });
    });
}



//Add an entry
function add(domain, color) {
    var tbody = $('#config tbody')[0];

    var tr       = $('<tr/>', {});
    var tdName   = $('<td/>').appendTo(tr);
    var tdColor  = $('<td/>').appendTo(tr);
    var tdButton = $('<td/>').appendTo(tr);

    var nameInput = $('<input/>', {
        name: 'domain[]',
        type: 'text',
        value: domain
    }).appendTo(tdName);
    var colorInput = $('<input/>', {
        name: 'color[]',
        type: 'text',
        value: color
    }).appendTo(tdColor);
    var button = $('<button/>', {
        text: "X"
    }).appendTo(tdButton);
    tr.appendTo(tbody);
}

function addEmpty() {
    add('', '');
}


//listeners
document.getElementById('add').addEventListener('click', addEmpty);
document.getElementById('save').addEventListener('click', save_config);
document.addEventListener('DOMContentLoaded', restore_config);
