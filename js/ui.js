var timer_count=1; // eventually need to load from storage so not to override current timers
var timer_type = '1';

var ui = {
    timer_types: function(){
        var view = {
            'id': 'timer_types',
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
            ui.set_type(timer_type, false);
        });
    },
    set_type: function(type, edit_mode){
//        var template = $('#template_edit_box').html();
//        Mustache.parse(template);
//
//        if(edit_mode){
//            var view = {
//                'edit_mode': true,
//                'title': 'the title of the selected timer',
//                'size': 'the size of the selected timer'
//            }
//        }
//        else{
//            var view = {};
//        }

        $('#timezone,#alarm_time,#countdown_time,#buttons_stopwatch,#buttons_lap_timer').hide();
        switch(type) {
            case '1':
                $('#timezone').show();
                break;
            case '2':
                $('#alarm_time').show();
                break;
            case '3':
                $('#countdown_time').show();
                break;
            case '4':
                $('#buttons_stopwatch').show();
                break;
            case '5':
                $('#buttons_lap_timer').show();
                break;
            default :
                alert('error, unknown type');
                break;
        }
        
        $('#add').on('click', function(){
            var title = $('#title').val();
            var size = $('#size').val();
            var timezone = $('#timezone').val();

            if(title !== '' && size !== '' && timezone !== '') {
                var view = {'guid' : 'timer'+timer_count, 'timezone': timezone, 'title': title, 'clockSize': size, 'type' : timer_type};
                timer_count++;
                preDraw(view);
            }
            else{
                alert('Please enter a valid value.');
            }
        });
        
    },
    render: function(){
        this.timer_types();
        this.set_type('1', false);
    }
}

function preDraw(view){
    switch(timer_type) {
        case '1':
            clock.render(view);
            break;
        case '2':
            timerClock.render(view);
            break;
        case '3':
            countDown.render(view);
            break;
        case '4':
            lapTimerClock.render(view);
            break;
        case '5':
            
            break;
        default :
            alert('error, unknown type');
            break;
    }

}