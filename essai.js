chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        switch (request.greeting) {

            case 'start' :
                sendResponse({success: this.openGreprolisResources()});
                break;

            case 'validate':
                sendResponse({success: this.validGreprolisResources()});
                break;

            case 'end':
                sendResponse({success: this.closeGreprolisResources()});
                break;
        }
    }
);

function openGreprolisResources() {

    var btn_open = $('a[name="farm_town_overview"]');
    if(btn_open.length > 0) {
        btn_open[btn_open.length - 1].click();
    }
    return (btn_open.length > 0) ? true : false;

    //setTimeout(validGreprolisResources, 5000);
}


function validGreprolisResources(){

    var btn_valid = $('a.button#fto_claim_button');
    if(btn_valid.length > 0) {
        btn_valid[btn_valid.length - 1].click();
    }
    //human_message_success
    return (btn_valid.length > 0) ? true : false;
    //setTimeout(closeGreprolisResources, 5000);
}

function closeGreprolisResources(){

    var btn_close = $('a.ui-dialog-titlebar-close');
    if(btn_close.length > 0) {
        btn_close[btn_close.length - 1].click();
    }
    return (btn_close.length > 0) ? true : false;
    //setTimeout(openGreprolisResources, 312000);
}
