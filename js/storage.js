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
    local : {
        save : function() {
            localStorage.setItem($('#storage_key_save').val(), JSON.stringify(temporary_storage));
        },
        load : function() {
            alert(localStorage.getItem($('#storage_key_load').val()));
        }
    },
    global : {
        save : function() {
            console.log(JSON.stringify(temporary_storage));
            $.ajax({
                type: "POST",
                url: "/storage/save",
                data: 'text=' + JSON.stringify(temporary_storage), // not working
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
                data: '',
                cache: false,
                success: function(msg) {
                    alert(msg);
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