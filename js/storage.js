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
    storeClock : function (value){                                  // Stores the new clock to the temporary_storage.
        var index = this.getIndex();
        value['ts_count'] = index;                                  // Change the ts_count for future updates.
        temporary_storage[index] = value;                           // Store  the new clock to the storage.
        updateSession('lsc',temporary_storage);                     // Update the session for lsc.
    },
    getIndex : function(){                                          // Gets an empty index.
        var index = 0;

        while(temporary_storage[index] != null){                    // Find a null or empty index so that it won't waste any memory.
            index++;
        }
        return index;                                               // Return the empty index value.
    },
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
                            this.storeClock(value);
                            timer_count++;
                            break;
                        case '2':
                            timerClock.render(value);
                            this.storeClock(value);
                            timer_count++;
                            break;
                        case '3':
                            countDownClock.render(value);
                            this.storeClock(value);
                            timer_count++;
                            break;
                        case '4':
                            stopWatchClock.render(value);
                            this.storeClock(value);
                            timer_count++;
                            break;
                        case '5':
                            lapTimerClock.render(value);
                            this.storeClock(value);
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
            if(localStorage.getItem($("#storage_key_save").val())){       // Check if there are items saved of the key.
                if(localStorage.getItem($("#storage_key_save").val()).length > 0){                                         // Check if there are current contents with the specified key value.
                    if(confirm("There are current saved contents with your specified name. Reset it?")){
                        localStorage.setItem($('#storage_key_save').val(), JSON.stringify(temporary_storage));             // Save the clocks.
                        localStorage.setItem($('#storage_key_save').val()+"_tabs", JSON.stringify(tabs_storage));          // Save the tabs.
                        alert("Saved!");
                    }
                }
            }else{
                localStorage.setItem($('#storage_key_save').val(), JSON.stringify(temporary_storage));             // Save the clocks.
                localStorage.setItem($('#storage_key_save').val()+"_tabs", JSON.stringify(tabs_storage));          // Save the tabs.
                alert("Saved!");
            }
           // maybe store last value in session and load after page reload.
           // or need track somehow from which name of local \ global storage get timers after page reload.
           // sessionStorage.setItem('last_timer', JSON.stringify(temporary_storage));
        },
        load : function() { //load from the local storage
            //get the items from the localStorage based from the inputted value
            var result = JSON.parse(localStorage.getItem($('#storage_key_load').val()));
            var loadedTabs = JSON.parse(localStorage.getItem($("#storage_key_load").val()+"_tabs"));
            if(loadedTabs != null && loadedTabs.length != 0)
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
            notice("Fetching data...",1); 
            $.ajax({
                type: "POST",
                url: "index.php/storage/save",
                data: 'padID=' + $('#storage_key_save').val() + '&text=' + JSON.stringify(temporary_storage) + '&tabID=' + $('#storage_key_save').val()+'tabs'+'&tabs='+JSON.stringify(tabs_storage), // not working
                cache: false,
                success: function(msg) {
                    $("div.tab-content").prepend("<span class='success' alt='loading'>Your data has been saved.</span><script id='tempscr'>$(function(){setTimeout(function(){$('.success').remove();$('#tempscr').remove();},2000);});</script>");
                },error: function(){
                    $("div.tab-content").prepend("<span class='error' alt='loading'>Error saving your data.</span><script id='tempscr'>$(function(){setTimeout(function(){$('.error').remove();$('#tempscr').remove();},2000);});</script>");
                }
            });
        },
        load : function() { //load globally based from the inputted key
            notice("Fetching data...",1); 
            $.ajax({
                type: "POST",
                url: "index.php/storage/load",
                data: 'padID=' + $('#storage_key_load').val(),
                cache: false,
                success: function(msg) {
                    if(msg !== ''){
                        var result = JSON.parse(msg);
                        $("div.tab-content").find(".notice").remove();
                        // if(result.data['tabs'] !== null && result.data['clocks'] !== null){ //check if there are data that are retrieved
                        //     if(result.data['tabs'] !== null){                               // Check if there are tabs.
                        //         tabs.loadTabs(JSON.parse(result.data['tabs']),false);       // Loads the tabs.
                        //     }

                        //     if(result.data['clocks'] !== null){                             // Check if there are clocks.
                        //         storage.generate(JSON.parse(result.data['clocks']));        // Load the clocks.
                        //     }
                        // }else{
                        //     $("div.tab-content").prepend("<span class='error' alt='loading'>Error. No data.</span><script id='tempscr'>$(function(){setTimeout(function(){$('.error').remove();$('#tempscr').remove();},2000);});</script>");
                        // }
                        storage.generate(result);        // Load the clocks.
                    }else{
                        notice("There is no data of your search.",2);
                    }
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

/**
 * Function for showing a notice message at the bottom of the panels
 * @param String str, int type
 * @return void
 */
function notice(str,type)
{
    $("div.tab-content").find(".notice").remove();
    switch(type){
        case 1:     // Loading
        case '1':
            $("div.tab-content").prepend("<div class='notice loading'><span class='pull-xs-left'>"+str+"</span><span class='pull-xs-right'><i class='fa fa-remove remove-notice'></i> </span></div>");
            break;
        case 2:     // Error
        case '2': 
            $("div.tab-content").prepend("<div class='notice error'><span class='pull-xs-left'>"+str+"</span><span class='pull-xs-right'><i class='fa fa-remove remove-notice'></i> </span></div>");
            break;
    }

    $("div.tab-content").find(".remove-notice").on("click", function (evt){
        $("div.tab-content").find(".notice").remove();
    });
}


/*
    Show a loading message when ajax call is started.
    Remove the temporary script after the process.
*/
$(document).ajaxStart(function () {
    // $("div.tab-content").prepend("<span class='loading' alt='loading'>Loading......</span><script id='tempscr'>$(document).ajaxStop(function(){$('span.loading').remove();$('#tempscr').remove();});</script>");
   //notice("Fetching data...",1); 
});