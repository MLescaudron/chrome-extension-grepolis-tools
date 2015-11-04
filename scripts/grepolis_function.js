/**
 * How many second to wait
 * @type {number}
 */
var second = 301;

/**
 *  Start the automate
 */
$('button#starting').on('click', function () {
    readyToRestart();
});

/**
 * Restart the automate
 */
function readyToRestart() {

    var action = ($('#looting').is(':checked')) ? 'double' : 'normal';

    var town = 0;
    var id = 0;

    var wood = parseInt($('.wood .amount').text());
    var stone = parseInt($('.stone .amount').text());
    var iron = parseInt($('.iron .amount').text());

    for (var id = 0; id < $('.farmtown_owned_on_same_island').length; id++) {

        town = $('.farmtown_owned_on_same_island')[id];
        townId = $(town).attr('id').replace('farm_town_', '');

        $.ajax({
            url: 'https://' + window.Game.world_id + '.grepolis.com/game/farm_town_info?town_id=' + window.Game.townId + '&action=claim_load&h=' + window.Game.csrfToken,
            data: {
                'json': '{"target_id":"' + townId + '","claim_type":"'+action +'","time":300,"town_id":' + window.Game.townId + ',"nl_init":true}',

            },
            type: 'post',
            dataType: 'json',
            success: function (json) {
                console.log(json);

                wood += 20;
                stone += 20;
                iron += 20;

                $('.wood .amount').text(wood);
                $('.stone .amount').text(stone);
                $('.iron .amount').text(iron);
                $('#time_to_end').html('Works !');
            },
            error: function (e, x, t) {
                console.log('error');
            },
        });
    }
    second = 301;
    waitMe();
}

/**
 * The Timer
 * @returns {boolean}
 */
function waitMe() {
    $('#time_to_end').html('Next resources in ' + second + 's');
    second--;

    if (second <= 0) {
        readyToRestart();
        return false;
    }

    setTimeout(waitMe, 1000);
}