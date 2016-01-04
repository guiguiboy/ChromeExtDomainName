/**
 * Created by gbretou on 15/12/2015.
 * cf. https://developer.chrome.com/extensions/samples#search:tab : broken links
 *
 * getting started : https://developer.chrome.com/extensions/getstarted
 */

//For better efficiency, url array has to be initialized before listener to avoid useless overhead


chrome.webNavigation.onCompleted.addListener(
    function(details) {

        if (details.frameId !== 0)
            return;

        var color   = '';
        var text    = ' ';
        var parser  = document.createElement('a');
        parser.href = details.url;
        var found   = false;

        chrome.storage.sync.get({
            domain: '',
            color: ''
        }, function(items) {
            console.log(items);
        });

        //based on hostname, get the text + color for the div
        console.log(parser.hostname);

        if (parser.hostname === 'phpsymfony.com') {
            //@todo : maybe replace with border ? first commit then try and revert if necessary ... 
            color = 'blue';
            text  = ' ';
            found = true;
        }
        if (found) {
            chrome.tabs.executeScript(details.tabId, {
                code: "var div = document.createElement('div');" +
                "var body = document.getElementsByTagName('body')[0];" +
                "div.textContent = '" + text + "';" +
                "div.id = 'chrome_ext_domain_name_alerter_div';" +
                "div.style.backgroundColor = '" + color + "';" +
                "div.style.minHeight = '5px';" +
                "body.insertBefore(div, body.firstChild);"
            });
        }
}
/*{
    url: [{
        hostContains: 'phpsymfony'
    }],
}*/
);
