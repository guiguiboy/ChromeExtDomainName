/**
 * Created by gbretou on 16/12/2015.
 */

//Save
function save_config() {
    var domain = document.getElementById('domain_1').value;
    var color  = document.getElementById('color_1').value;

    chrome.storage.sync.set({
        domain: domain,
        color: color
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
        domain: '',
        color: ''
    }, function(items) {
        document.getElementById('domain_1').value = items.domain;
        document.getElementById('color_1').value = items.color;
    });
}

//listeners
document.getElementById('save').addEventListener('click', save_config);
document.addEventListener('DOMContentLoaded', restore_config);
