var timer_count=1; // eventually need to load from storage so not to override current timers
var selected = [];
function ui(){
    $('#add').on('click', function(){
        $('#checkboxes').find('input:checked').each(function() {
            selected.push($(this).attr('id'));
        });

        //console.log(selected.slice(-1)[0]);

        var title = $('#title').val();
        var size = $('#size').val();
        var timezone = $('#timezone').val();

        if(title !== '' && size !== '' && timezone !== '') {
            var view = { 'timezone': timezone, 'city': title, 'clockSize': size, 'guid' : 'timer'+timer_count};
            timer_count++;
            preDraw(view);
        }
    });
}

function preDraw(view){
    var template = $('#template').html();
    Mustache.parse(template);
    var output = Mustache.render(template, view);
    $('#timer_holder').append(output);
    switch(selected.slice(-1)[0]) {
        case 'clock':
            drawClock(parseInt(view['clockSize']), parseInt(view['timezone']), view['guid']);
            break;
        case 'alarm':
            alert('alarm');
            break;
        case 'stopwatch':
            alert('stopwatch');
            break;
        case 'countdown':
            drawCountDown(parseInt(view['clockSize']), 3670, view['guid']);
            break;
        case 'laptimer':
            drawLapTimer(parseInt(view['clockSize']), view['guid']);
            break;
        default :
            break;
    }
}