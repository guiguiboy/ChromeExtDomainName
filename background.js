/**
 * Created by gbretou on 15/12/2015.
 * cf. https://developer.chrome.com/extensions/samples#search:tab : broken links
 *
 * getting started : https://developer.chrome.com/extensions/getstarted
 */

var extDomainName = function(tabId, parser) {
    this.tabId  = tabId;
    this.parser = parser;

    /**
     * Adds a div on the top
     */
    this.generateDiv = function(items) {
        var color   = '';
        var text    = ' ';

        items.values.forEach(function(element) {
            var found = false;
            if (parser.hostname === element.domain) {
                color = element.color;
                text  = ' ';
                found = true;
            }
            if (found) {
                chrome.tabs.executeScript(this.tabId, {
                    code: "var div = document.createElement('div');" +
                    "var container = document.getElementsByTagName('html')[0];" +
                    "div.textContent = '" + text + "';" +
                    "div.id = 'chrome_ext_domain_name_alerter_div';" +
                    "div.style.backgroundColor = '" + color + "';" +
                    "div.style.minHeight = '5px';" +
                    "container.insertBefore(div, container.firstChild);"
                });
            }
        });
    };
};

chrome.webNavigation.onCompleted.addListener(
    function(details) {

        if (details.frameId !== 0)
            return;

        var parser  = document.createElement('a');
        parser.href = details.url;
        var mod = new extDomainName(details.tabId, parser);

        chrome.storage.sync.get({
            values: {}
        }, mod.generateDiv
        );
}, {
        url: [{
            schemes: ['http', 'https']
        }]
    }
);
