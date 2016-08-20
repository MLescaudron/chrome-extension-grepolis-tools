/**
 * How many second to wait
 * @type {number}
 */
var second = 300;
var elems = [];

$('#human_message').css({opacity: 1, display: 'inline-block'}).addClass('success_msg');
$('#human_message .middle .inner .text').html('Extension installed !');
setTimeout(function () {
    $('#human_message').animate({opacity: 0, display: 'none'}, 200, function () {
        $('#human_message .middle .inner .text').html('');
    })
}, 2000);

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
        if (town !== 'undefined') {
            var coord = MapTiles.correctCoordsForIsland(WMap.mapData.findTownInChunks(parseInt(town)));
            WMap.centerMapOnPos(coord.x, coord.y, !0, function () {
                var townFarms = {
                    id: town,
                    farms: []
                };
                $('.owned.farm_town').each(function () {
                    var id = $(this).attr('data-id');
                    townFarms.farms.push(id);
                });
                citiesId.push(townFarms);
            });
        }
    }
    var a = new window.GameModels.FarmTownPlayerRelation();
    a.claim_extension = function (id, tid) {
        var d = this.execute("claim", {farm_town_id: id, type: "resources", option: 1}, {"town_id": tid});
    }

    citiesId.forEach(function (city) {
        city.farms.forEach(function (farm, i) {
            console.log(farm);
            console.log(city.id);
            console.log(city.i);
            window.Game.townId = city.id;
            a.claim_extension(farm, city.id);
        });
    });

    var lastNumber = GPWindowMgr.getNextWindowId();
    var result = lastNumber - number;
    for (var t = 0; result > t; t++) {
        if (GPWindowMgr.GetByID(number + t)) {
            GPWindowMgr.GetByID(number + t).close();
        }
    }

    window.Game.townId = baseId;

    second = 300;
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
