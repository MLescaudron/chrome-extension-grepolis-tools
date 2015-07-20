/**
 *  Start the automate
 */
$('button#starting').on('click', function () {
    openGreprolisResources();
});

/**
 * Open the cities pages to get or loot their resources
 */
function openGreprolisResources() {

    $('#time_to_end').html('Started ! - Wait pls')

    var btn_open = $('a[name="farm_town_overview"]');
    btn_length = (btn_open) ? btn_open.length : 0;

    if(btn_length > 0) {
        btn_open[btn_length - 1].click();
    }

    if ($('#looting').is(':checked')) {
        setTimeout(lootingGreprolisResources, 4000);
    } else {
        setTimeout(validGreprolisResources, 4000);
    }

}

/**
 * Click on loot page
 */
function lootingGreprolisResources(){

    $('#time_to_end').html('Looted ! - Wait pls');
    var btn_looting = $('#fto_pillage');
    btn_looting.click();
    btn_length = (btn_looting) ? btn_looting.length : 0;

    setTimeout(validGreprolisResources, 4000);
}

/**
 * Valide the page to get resources
 */
function validGreprolisResources(){
    $('#time_to_end').html('Validated ! - Wait pls');
    var btn_valid = $('a.button#fto_claim_button');

    btn_length = (btn_valid) ? btn_valid.length : 0;
    if(btn_length > 0) {
        btn_valid[btn_length - 1].click();
    }

    setTimeout(closeGreprolisResources, 4000);
}

/**
 * Close the page to continue to play
 */
function closeGreprolisResources(){

    var btn_close = $('a.ui-dialog-titlebar-close');
    btn_length = (btn_close) ? btn_close.length : 0;

    if(btn_length > 0) {
        btn_close[btn_length - 1].click();
    }

    //Restart after 5min
    ReadyToRestart(300000,0);
}

/**
 * Restart the automate
 * @param MaxTime
 * @param time
 * @constructor
 */
function ReadyToRestart(MaxTime,time){

    if (time < MaxTime) {
        $('#time_to_end').html('Time to restart : ' + ((MaxTime - time) / 1000) + 's')
        setTimeout((function () {
            ReadyToRestart(MaxTime,time + 1000);

        }), 1000);
    } else {
        openGreprolisResources();
    }

}
