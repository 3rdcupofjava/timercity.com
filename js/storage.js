function storage_check(){
    // IF RETURNING USER
    if(localStorage.getItem('clock_s') !== null) {

    } else if(localStorage.getItem('timerClock_s') !== null) {

    } else if(localStorage.getItem('countDownClock_s') !== null) {

    } else if(localStorage.getItem('stopWatchClock_s') !== null) {

    } else if(localStorage.getItem('lapTimerClock_s') !== null) {

    } else {

        timerClock.render(130, 0, 'Demo Timer'); // timer presented if user came in first time and no global \ local storage.
    }

}

var storage = {
    local : {
        save : function() {
            alert('local save');
        },
        load : function() {
            alert('local load');
        }
    },
    global : {
        save : function() {
            $.ajax({
                type: "POST",
                url: "/storage/save",
                data: "name=John Smith&location=Boston", // TODO: timer data / view state
                cache: false,
                success: function(msg) {
        //                        console.log(msg);
                }
            });
        },
        load : function() {
            alert('load');
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