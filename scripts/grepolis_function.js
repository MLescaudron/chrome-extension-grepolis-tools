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

    var citiesId = [];
    var baseId = window.Game.townId;

    for (var town in ITowns.towns) {
        var coord = MapTiles.correctCoordsForIsland(WMap.mapData.findTownInChunks(town));
        WMap.centerMapOnPos(coord.x, coord.y, !0, function () {
            var townFarms = {
                id: town,
                farms: []
            };
            $('.farmtown_owned').each(function () {
                var id = $(this).attr('id').replace('farm_town_', '');
                townFarms.farms.push(id);
            });
            citiesId.push(townFarms);
        });
    }

    citiesId.forEach(function (city) {
        city.farms.forEach(function (farm) {
            window.Game.townId = city.id;
            getResourcesByTownId(farm);
        });
    });
    window.Game.townId = baseId;

    second = 300;
    setTimeout(waitMe, 1000);
}


/**
 * Get ressources on the townId
 * @param townId
 */
function getResourcesByTownId(townId) {

    var action = ($('.looting_checkbox .checkbox_new').hasClass('checked')) ? 'double' : 'normal';
    var c = {action: 'claim_info'};
    var nextIndex = (parseInt(GPWindowMgr.getNextWindowId()) + 1);

    nextI = 'gpwnd_' + nextIndex;

    GPWindowMgr.Create(GPWindowMgr.TYPE_FARM_TOWN, 'Extension <span class="farm_town_title_postfix">Grepolis Tools</span>', c, townId);
    $('#' + nextI).parent().parent().css('visibility', 'hidden');

    // Get and call
    var farmTowncity = GPWindowMgr.getWindowById(nextIndex)
    farmTowncity.call('claimLoad', townId, action, 300, 32, false, 0);
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
