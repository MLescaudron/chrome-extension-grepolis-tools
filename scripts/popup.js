/**
 * Created by Mathieu on 19/07/2015.
 */

/**
 * Useful to interact between tabs and popup
 */
document.addEventListener('DOMContentLoaded', function () {

    localStorage['chrome_response'] = 'no data send';
    onElements();
});


/**
 * Attach 'click' evenement to inject html in web page
 */
function onElements() {
    $('button#inject').on('click', function () {
        $.get("injection.html", function(data){
            chromeSend(data);
            $('#grepolis_injection').html('Successfully injected !');
        });
    });

}

/**
 * Send data to web page
 * @param sendData
 */
function chromeSend(sendData) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {data: sendData}, function (response) {
           console.log('Successfully injected !');
        });
    });
}
