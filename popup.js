document.addEventListener('DOMContentLoaded', function () {

    localStorage['chrome_response'] = 'no data send';
    onElements();
});

/**
 *
 */
function onElements() {

    $('button#my_test').on('click', function () {
        launch();
    });
}

/**
 *
 */
function launch() {

    var btn = parseInt($('button#my_test').attr('data-start'));
    if (btn === 0) {
        chromeSend('start');
    }

}

/**
 *
 * @param sendData
 */
function chromeSend(sendData) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {greeting: sendData}, function (response) {
            //if(response.success) {
                updateStatus(sendData);
            //}
        });
    });
}

/**
 *
 * @param sendData
 */
function updateStatus(sendData) {

    switch (sendData) {
        case 'false':

            break;
        case 'start':
                setTimeout((function(){chromeSend('validate');}),4000);
            break;
        case 'validate':
                setTimeout((function(){chromeSend('end');}),4000);
            break;
        case 'end':
                console.log('That\'s finish !')
            break;

    }
    console.log(sendData);
}