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
        if($("div.tab-pane.active").length > 0)
        {
            for (var i=0; i<result.length; i++) {
                if(result.hasOwnProperty(i) && !jQuery.isEmptyObject(result[i])) {
                    var value = result[i],
                        timer_type = result[i].type;

                        var str = "#"+ value["guid"];

                        /*
                            Check if there are other clocks with the same ID's.
                            Remove the specific clock object.
                            Also remove the navigation of the specific clock.
                        */
                        $(str+"_nav").show();
                        $(str+"_nav").remove();
                        $(".lapTimeHolder").html("");
                        clearInterval(clockObject[value["guid"]]);
                        //remove the clock from the canvas
                        $(str).remove();

                    /*
                        Generate the result of the query and automatically push the value to temporary_storage
                        and increment the timer_count to update the value.
                    */
                    switch(timer_type) {
                        case '1':
                            clock.render(value);
                            temporary_storage.push(value);
                            timer_count++;
                            break;
                        case '2':
                            timerClock.render(value);
                            temporary_storage.push(value);
                            timer_count++;
                            break;
                        case '3':
                            countDownClock.render(value);
                            temporary_storage.push(value);
                            timer_count++;
                            break;
                        case '4':
                            stopWatchClock.render(value);
                            temporary_storage.push(value);
                            timer_count++;
                            break;
                        case '5':
                            lapTimerClock.render(value);
                            temporary_storage.push(value);
                            timer_count++;
                            break;
                        default :
                            alert('error, unknown type');
                            break;
                    }
                }
            }
        }else{
            alert("No Active Tab.");
        }
    },
    local : {
        save : function() { //save locally
            localStorage.setItem($('#storage_key_save').val(), JSON.stringify(temporary_storage));
            localStorage.setItem($('#storage_key_save').val()+"_tabs", JSON.stringify(tabs_storage));
            alert("Saved!");
           // maybe store last value in session and load after page reload.
           // or need track somehow from which name of local \ global storage get timers after page reload.
           // sessionStorage.setItem('last_timer', JSON.stringify(temporary_storage));
        },
        load : function() { //load from the local storage
            //get the items from the localStorage based from the inputted value
            var result = JSON.parse(localStorage.getItem($('#storage_key_load').val()));
            var loadedTabs = JSON.parse(localStorage.getItem($("#storage_key_load").val()+"_tabs"));
            if(loadedTabs != null)
                tabs.loadTabs(loadedTabs,false);   //load the tabs
            if(result != null){
                //generate the result
                storage.generate(result);
            }else{
                alert("No data for your search.");
            }           
        }
    },
    global : { //save globally in the e.znotez
        save : function() { //save globally all the clocks as a string from the temporary_storage
            $.ajax({
                type: "POST",
                url: "index.php/storage/save",
                data: 'padID=' + $('#storage_key_save').val() + '&text=' + JSON.stringify(temporary_storage) + '&tabID=' + $('#storage_key_save').val()+'tabs'+'&tabs='+JSON.stringify(tabs_storage), // not working
                cache: false,
                success: function(msg) {
                    alert('saved!');
                },error: function(){
                    alert("error");
                }
            });
        },
        load : function() { //load globally based from the inputted key
            $.ajax({
                type: "POST",
                url: "index.php/storage/loadTabs",
                data: 'tabID=' + $('#storage_key_load').val(),
                cache: false,
                success: function(msg) {
                    if(msg){ //check if there are data that are retrieved
                        var result = JSON.parse(msg);
                        tabs.loadTabs(result,false);
                    }
                    $.ajax({
                        type: "POST",
                        url: "index.php/storage/load",
                        data: 'padID=' + $('#storage_key_load').val(),
                        cache: false,
                        success: function(msg) {
                            if(msg){ //check if there are data that are retrieved
                                var result = JSON.parse(msg);
                                storage.generate(result);  
                            }
                            else //alert if there are no data from the search
                                alert("No data.");
                        }
                    });
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

/*
    Show a loading animated icon when ajax call is started
*/
$(document).ajaxStart(function () {
    $("div.tab-content").append("<span class='loading' alt='loading'>Loading......</span><script>$(document).ajaxStop(function(){$('span.loading').remove();});</script>");
});