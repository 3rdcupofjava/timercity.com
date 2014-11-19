var timer_count=1; // eventually need to load from storage so not to override current timers
function ui(){
    $('#add').on('click', function(){
        var view = { 'timezone': 0, 'city': 'Paris', 'clockSize': 130, 'guid' : 'timer'+timer_count};
        timer_count++;
        preDraw(view);
    });
}

function preDraw(view){
    var output = Mustache.render(template, view);
    $('#timer_holder').append(output);
    drawClock(view['clockSize'], view['timezone'], view['guid']);
}