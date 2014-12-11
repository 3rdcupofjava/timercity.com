$(document).ready(function(){
    // EXTEND THE TIMER OBJECTS
    $.extend(timerClock, clock);
    $.extend(countDownClock, clock);
    $.extend(stopWatchClock, clock);
    $.extend(lapTimerClock, clock);
    
    storage_check();
    ui.render();
});