if(typeof(timer_count) === "undefined")
{
    var timer_count=1; // eventually need to load from storage so not to override current timers
}
var timer_type = '1';
var type_name = "";
var temporary_storage = [],
    ts_count = 0;   //counter for the index of the temporary_storage

var ui = {
    toggleNav: function(li, navbar){
        $('.subnav').hide();
        if(li.hasClass('active')){
            li.removeClass('active');
            $(navbar).hide();
        }
        else{
            li.addClass('active')
                .siblings().removeClass('active');
            $(navbar).show();
        }
    },
    nav: function(){
        $('#save').on({
            click: function(event) {
                event.preventDefault();
                ui.toggleNav($(this).parent(), '#nav_save')
            }
        });
        
        $('#save_local').on({
            click: function(event) {
                event.preventDefault();
                storage.local.save();
            }
        });
        
        $('#save_global').on({
            click: function(event) {
                event.preventDefault();
                storage.global.save();
            }
        });

        $('#load').on({
            click: function(event) {
                event.preventDefault();
                ui.toggleNav($(this).parent(), '#nav_load')
            }
        });
        
        $('#load_local').on({
            click: function(event) {
                event.preventDefault();
                storage.local.load();
            }
        });
        
        $('#load_global').on({
            click: function(event) {
                event.preventDefault();
                storage.global.load();
            }
        });
        
        
        $('#sign_up a').on('click', function(){

            var parent = $(this).parent();
            if(parent.hasClass('active')){
                parent.removeClass('active');
                $('#registration_sorry').hide();
            }
            else{
                parent.addClass('active')
                    .siblings().removeClass('active');
                $('#registration_sorry').show();
            }
            $('#registration_form').hide();

        });
        
        $('#log_in a').on('click', function(){

            var parent = $(this).parent();
            if(parent.hasClass('active')){
                parent.removeClass('active');
                $('#registration_form').hide();
            }
            else{
                parent.addClass('active')
                    .siblings().removeClass('active');
                $('#registration_form').show();
                $('#button_request').hide();
                $('#button_log_in').show();
            }
            $('#registration_sorry').hide();

            $('#password').show();
            $('#why').hide();

        });
        
        $('#early_registration').on('click', function(){

            $('#registration_sorry').toggle();
            $('#registration_form').show();

            $('#button_log_in').hide();
            $('#button_request').show();

            $('#password').hide();
            $('#why').show();

        });
        
        $('#button_register').on('click', function(){
            $('#registration_form')
                .attr('action', '/yaam/public/register');
        }); 
    },
    timer_types: function(){
        var view = {
            'id': 'timer_types',
            'name': 'timer_types',
            'type': 'radio',
            'options':[
                {'oid': 1, 'title': 'Clock', 'checked': true},
                {'oid': 2, 'title': 'Alarm', 'checked': false},
                {'oid': 3, 'title': 'Countdown', 'checked': false},
                {'oid': 4, 'title': 'Stopwatch', 'checked': false},
                {'oid': 5, 'title': 'Lap Timer', 'checked': false}
            ]
        };

        var template = $('#template_select').html();
        Mustache.parse(template);
        var output = Mustache.render(template, view);
        $('#left_col').prepend(output);

        $("input:radio[name='timer_types']").on('change', function(){
            timer_type = $("input:radio[name='timer_types']:checked").val();
            ui.set_type(null,timer_type, false);
        });
    },
    set_type: function(guid, type, edit_mode){
        if(edit_mode){
            this.set_type(null,type,false);
            var title = $('#title').val();
            var size = $('#size').val();
            var timezone = $("#timezone").val();
            var time = $('#countdown_time').val();
            var alarm_time = $('#alarm_time').val();

            var view = {
                'guid' : guid.id,
                'type' : type,
                'timezone' : timezone,
                'title' : title,
                'clockSize' : size,
                'time' : time,
                'type_name': type_name,
                'alarm_time' : alarm_time,
                'ts_count' : clocks[guid.id].ts_count
            };
            if(type == 3){
                countDownClock.stop(guid);
                cd_params[guid.id] = null;
            }else if(type == 4){
                stopWatchClock.reset(guid);
            }else if(type == 5){
                lapTimerClock.reset(guid);
            }
            removeClock(guid,view['ts_count']);
            preDraw(view);
        }else{
            $('#timezone,#alarm_time,#countdown_time,#buttons_stopwatch,#buttons_lap_timer').hide();
            switch(type) {
                case '1':
                case 1:
                    $('#timezone').show();
                    type_name = "( World Clock )";
                    break;
                case '2':
                case 2:
                    $('#alarm_time').show();
                    $('#timezone').show();
                    type_name = "( Alarm Clock )";
                    break;
                case '3':
                case 3:
                    $('#countdown_time').show();
                    type_name = "( Countdown Timer )";
                    break;
                case '4':
                case 4:
                    $('#buttons_stopwatch').show();
                    type_name = "( Stopwatch )";
                    break;
                case '5':
                case 5:
                    $('#buttons_lap_timer').show();
                    type_name = "( Lap Timer )";
                    break;
                default :
                    alert('error, unknown type');
                    break;
            }
        }
    },  
    render: function(){
        this.nav();
        this.timer_types();
        this.set_type(null,'1', false);
        
        //digitalTimer.render();
        
        $('#alarm_time').timepicker({'timeFormat':'H:i'});
        $('#countdown_time').timepicker({'timeFormat':'H:i:s'});

        tabs.updateStorageIndex();          //update the index
        tabs.store(newTabCount,"Home");     //store the Home
        tabs.updateTabsDroppable();         //update the droppables

        //check if there are last session tabs
        if(sessionStorage.getItem('lst') != null){
            tabs.loadTabs(JSON.parse(sessionStorage.getItem('lst')),true);
        }
    }
};

/**
 * this function create timers and set localStorage value
 * @param view
 */
function preDraw(view){
    switch(timer_type) {
        case '1':
        case 1:
            clock.render(view);

            temporary_storage.push(view);
            break;
        case '2':
        case 2:
            timerClock.render(view);
            temporary_storage.push(view);
            break;
        case '3':
        case 3:
            countDownClock.render(view);
            temporary_storage.push(view);
            break;
        case '4':
        case 4:
            stopWatchClock.render(view);
            temporary_storage.push(view);
            break;
        case '5':
        case 5:
            lapTimerClock.render(view);
            temporary_storage.push(view);
            break;
        default :
            alert('error, unknown type');
            break;
    }

}

$(document).ready(function(){
    $('#add').on('click', function(){
        if($("div.tab-pane.active").length > 0)
        {
            var title = $('#title').val();
            var size = $('#size').val();
            var timezone = $("#timezone").val();
            var time = $('#countdown_time').val();
            var alarm_time = $('#alarm_time').val();

            if(size < 100) size = 100; //minimum size will be 100
            if(title !== '' && size !== '' && !isNaN(size)) {
                if(timer_type != 2) //not alarm clock
                {
                    if(timer_type == 3) //if count down
                    {
                        if(time.match(/:/g) != null && time.match(/:/g).length == 2) //check if it contains 2 :
                        {
                            var tempSplit = time.split(":");
                            if(tempSplit[0] == '' || tempSplit[1] == '' || tempSplit[2] == '' ||
                                isNaN(tempSplit[0]) || isNaN(tempSplit[1]) || isNaN(tempSplit[2]))
                            {
                                alert("Invalid Countdown value");
                                return 0;
                            }
                        }
                        else
                        {
                            alert("Invalid Countdown value.");
                            return 0;
                        }
                    }
                    var view = {'guid' : 'timer'+timer_count, 'timezone': timezone, 'title': title, 'clockSize': size, 'type' : timer_type, 'time': time, 'type_name' : type_name};
                }
                else //if alarm clock
                {
                    if(alarm_time.match(/:/g) != null && alarm_time.match(/:/g).length == 1)
                    {
                        var tempSplit = alarm_time.split(":");
                        if(tempSplit[0] == '' || tempSplit[1] == '' ||
                            isNaN(tempSplit[0]) || isNaN(tempSplit[1]))
                        {
                            alert("Invalid alarm time.");
                            return 0;
                        }
                    }
                    else
                    {
                        alert("Invalid alarm time.");
                        return 0;
                    }
                    var view = {'guid' : 'timer'+timer_count, 'timezone': timezone, 'title': title, 'clockSize': size, 'type' : timer_type, 'alarm_time': alarm_time, 'type_name' : type_name};
                }
                timer_count++;
                preDraw(view);
                return 0;
            }
            else
            {
                alert('Please enter a valid value.');
                return 0;
            }
        }else{
            alert("No Active Tab.");
        }
    });

});