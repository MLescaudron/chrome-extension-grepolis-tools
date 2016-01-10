/**
 * How many second to wait
 * @type {number}
 */
var second = 300;
var elems = [];

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
    elems = [];
    var number = GPWindowMgr.getNextWindowId() + 1;

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
    var last = 0;
    citiesId.forEach(function (city) {
        city.farms.forEach(function (farm,i) {
            window.Game.townId = city.id;
            getResourcesByTownId(farm,i);
            if(i - 1 >= 0){
                var toClose = elems[i - 1];
                last = toClose;
                toClose.close();
            }
        });
    });

    var lastNumber = GPWindowMgr.getNextWindowId();
    var result = lastNumber - number;
    for(var t = 0;result > t;t++){
        if(GPWindowMgr.GetByID(number + t)){
            GPWindowMgr.GetByID(number + t).close();
        }
    }
    var toClose = elems[last - 1];
    toClose.close();

    window.Game.townId = baseId;

    second = 300;
    setTimeout(waitMe, 1000);
}


/**
 * Get ressources on the townId
 * @param townId
 */
function getResourcesByTownId(townId,i) {
    var action = ($('.looting_checkbox .checkbox_new').hasClass('checked')) ? 'double' : 'normal';
    var c = {action: 'claim_info'};
    var nextIndex = (parseInt(GPWindowMgr.getNextWindowId()) + 1);

    nextI = 'gpwnd_' + nextIndex;

    elems[i] = GPWindowMgr.Create(GPWindowMgr.TYPE_FARM_TOWN, 'Extension <span class="farm_town_title_postfix">Grepolis Tools</span>', c, townId);

    // Get and call
    var windowGrepolis = elems[i];
    windowGrepolis.call('claimLoad', townId, action, 300, 0, false, 0);
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
