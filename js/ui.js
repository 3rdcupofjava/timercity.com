function ui(){
    $('#add').on('click', function(){
        var view = { 'timezone': 0, 'city': 'Paris', 'clockSize': 130};
        preDraw(view);
    });
}

function preDraw(view){
    var output = Mustache.render(timer_box, view);
    $('#timer_holder').append(output);
    drawClock(view['clockSize'], view['timezone'], view['city']);
}