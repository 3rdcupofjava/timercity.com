//function storage_check(){
//    // IF RETURNING USER
//    if(localStorage.getItem('clock_s') !== null) {
//
//    } else if(localStorage.getItem('timerClock_s') !== null) {
//
//    } else if(localStorage.getItem('countDownClock_s') !== null) {
//
//    } else if(localStorage.getItem('stopWatchClock_s') !== null) {
//
//    } else if(localStorage.getItem('lapTimerClock_s') !== null) {
//
//    } else {
//
//        timerClock.render(130, 0, 'Demo Timer'); // timer presented if user came in first time and no global \ local storage.
//    }
//
//}

var storage = {
    generate: function(result) {
        for (var i in result) {
            if(result.hasOwnProperty(i) && !jQuery.isEmptyObject(result[i])) {
                var value = result[i],
                    timer_type = result[i].type;

                switch(timer_type) {
                    case '1':
                        clock.render(value);
                        break;
                    case '2':
                        timerClock.render(value);
                        break;
                    case '3':
                        countDownClock.render(value);
                        break;
                    case '4':
                        stopWatchClock.render(value);
                        break;
                    case '5':
                        lapTimerClock.render(value);
                        break;
                    default :
                        alert('error, unknown type');
                        break;
                }
        }
    }
    },
    local : {
        save : function() {
            localStorage.setItem($('#storage_key_save').val(), JSON.stringify(temporary_storage));
           // maybe store last value in session and load after page reload.
           // or need track somehow from which name of local \ global storage get timers after page reload.
           // sessionStorage.setItem('last_timer', JSON.stringify(temporary_storage));
        },
        load : function() {
            var result = JSON.parse(localStorage.getItem($('#storage_key_load').val()));

            storage.generate(result);
        }
    },
    global : {
        save : function() {
            $.ajax({
                type: "POST",
                url: "/storage/save",
                data: 'padID=' + $('#storage_key_save').val() + '&text=' + JSON.stringify(temporary_storage), // not working
                cache: false,
                success: function(msg) {
                    alert('saved!');
                }
            });
        },
        load : function() {
            $.ajax({
                type: "POST",
                url: "/storage/load",
                data: 'padID=' + $('#storage_key_load').val(),
                cache: false,
                success: function(msg) {
                    //alert(msg);
                    var result = JSON.parse(msg);

                    storage.generate(result);
                }
            });
        }
    },
    user : { // TODO: after auth, login, etc...
        save : function() {
            alert('save to users account');
        },
        load : function() {
            alert('load from users account');
        }
    },
};