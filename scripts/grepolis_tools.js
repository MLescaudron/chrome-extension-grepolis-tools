/**
 * Created by Mathieu on 19/07/2015
 */

/**
 * Get the data send.
 */
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        var s = document.createElement('script');
        s.src = chrome.extension.getURL('scripts/grepolis_function.js');
        (document.head||document.documentElement).appendChild(s);
        s.onload = function() {
            s.parentNode.removeChild(s);
        };

        //append into the trades activity toolbar
        $('div#toolbar_activity_trades_list div.content').append(request.data);
    }
);