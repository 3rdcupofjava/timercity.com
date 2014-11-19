// IF RETURNING USER
if(localStorage.getItem('person') !== null) {
    var tmp = JSON.parse(localStorage.person);

    var t_guid = tmp.city.toLowerCase().slice(0,2) + '_t';
    var s_guid = tmp.city.toLowerCase().slice(0,2) + '_s';
    var c_guid = tmp.city.toLowerCase().slice(0,2) + '_c';

    drawClock(tmp.clockSize, tmp.timezone, tmp.city);
//    drawClock(tmp.clockSize, -1, 'Paris');
//    drawTimer(tmp.clockSize, t_guid);
//    drawTimer(tmp.clockSize, 'pari_t');
//    drawLapTimer(tmp.clockSize, s_guid);
//    drawLapTimer(tmp.clockSize, 'pari_s');
//    drawCountDown(tmp.clockSize, tmp.startsCountDown, c_guid);
//    drawCountDown(tmp.clockSize, 3670, 'pari_c');
} else { // NEW USER, DEMO CLOCKS
    drawClock(100, 0, 'London');
//    drawTimer(100, 'lon_t');
//    drawLapTimer(100, 'lon_s');
//    drawCountDown(100, 11480, 'lon_c');
}

var person = { 'timezone': 0, 'city': 'London', 'clockSize': 130, 'startsCountDown': 11480 };
localStorage.setItem('person', JSON.stringify(person));