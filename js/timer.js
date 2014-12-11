var radians = 0.0174532925,
        clockRadius = 200,
        margin = 50,
        width = (clockRadius+margin)*2,
        height = (clockRadius+margin)*2,
        hourHandLength = 2*clockRadius/3,
        minuteHandLength = clockRadius,
        secondHandLength = clockRadius-12,
        secondHandBalance = 30,
        secondTickStart = clockRadius,
        secondTickLength = -10,
        hourTickStart = clockRadius,
        hourTickLength = -18,
        secondLabelRadius = clockRadius + 16,
        secondLabelYOffset = 5,
        hourLabelRadius = clockRadius - 40,
        hourLabelYOffset = 7;
        counter = 0;

var hourScale = d3.scale.linear()
        .range([0,330])
        .domain([0,11]);

var minuteScale = secondScale = d3.scale.linear()
        .range([0,354])
        .domain([0,59]);

var handData = [
    {
        type:'hour',
        value:0,
        length:-hourHandLength,
        scale:hourScale
    },
    {
        type:'minute',
        value:0,
        length:-minuteHandLength,
        scale:minuteScale
    },
    {
        type:'second',
        value:0,
        length:-secondHandLength,
        scale:secondScale,
        balance:secondHandBalance
    }
];

var timerData = [
    {
        type:'hour',
        value:0,
        length:-hourHandLength,
        scale:hourScale
    },
    {
        type:'minute',
        value:0,
        length:-minuteHandLength,
        scale:minuteScale
    },
    {
        type:'second',
        value:0,
        length:-secondHandLength,
        scale:secondScale,
        balance:secondHandBalance
    }
];

var lapTimerData = [
    {
        type:'hour',
        value:0,
        length:-hourHandLength,
        scale:hourScale
    },
    {
        type:'minute',
        value:0,
        length:-minuteHandLength,
        scale:minuteScale
    },
    {
        type:'second',
        value:0,
        length:-secondHandLength,
        scale:secondScale,
        balance:secondHandBalance
    }
];

var countData = [
    {
        type:'hour',
        value:0,
        length:-hourHandLength,
        scale:hourScale
    },
    {
        type:'minute',
        value:0,
        length:-minuteHandLength,
        scale:minuteScale
    },
    {
        type:'second',
        value:0,
        length:-secondHandLength,
        scale:secondScale,
        balance:secondHandBalance
    }
];

var clocks = [];
var clock = {
    render : function(view){
        var dd = $(".digital_display");
        var clockRadius = parseInt(view['clockSize']);
        var offset = parseInt(view['timezone']);
        var guid = view['guid'];
        clocks[guid] = view;
        seconds = 0, minutes = 0, hours = 0;

        var template = $('#template_timer_box').html();
        Mustache.parse(template);
        var output = Mustache.render(template, view);
        //append the output to the specific tab
        if(view['type'] !== 'undefined')
        {
            switch(view['type'])
            {
                case '1':
                    $('#worldClockTab > .timer_holder').append(output);  
                    break;
                case '2':
                    $('#alarmClockTab > .timer_holder').append(output); 
                    break;
                case '3':
                    $('#countDownTab > .timer_holder').append(output); 
                    break;
                case '4':
                    $('#stopWatchTab > .timer_holder').append(output);
                    break;
                case '5':
                    $('#lapTimeTab > .timer_holder').append(output);
                    break;
                default:
                    $('#home > .timer_holder').append(output);   
                    break;
            }
        }
        
        // clicking on a timer to edit
        $('#' + guid + '_link').on('click', function(){
            
            $('#title').val(clocks[guid].title);
            $('#size').val(clocks[guid].size);
            $('#timezone').val(clocks[guid].timezone);
            
            ui.set_type(clocks[guid].type, true)
        });

        //updateData(offset);	//draw them in the correct starting position

        if(view['type'] !== 'undefined')
        {
            if(view['type'] == '1')
            {
                setInterval(function(){
                    updateData(offset,guid);
                    moveHands(guid);
                }, 1000);
            }
        }

        var width = (clockRadius+margin)*2,// replace global definition in function scope.
                height = (clockRadius+margin)*2,
                secondTickStart = clockRadius,
                hourTickStart = clockRadius,
                secondLabelRadius = clockRadius + 16,
                hourLabelRadius = clockRadius - 40

        var svg = d3.select('#' + guid + ' .svg_placeholder').append("svg")
                .attr("width", width)
                .attr("height", height)
                .attr('class', 'img-thumbnail');


        var face = svg.append('g')
                .attr('id','clock-face')
                .attr('transform','translate(' + (clockRadius + margin) + ',' + (clockRadius + margin) + ')');

        //add marks for seconds
        face.selectAll('.second-tick')
                .data(d3.range(0,60)).enter()
                .append('line')
                .attr('class', 'second-tick')
                .attr('x1',0)
                .attr('x2',0)
                .attr('y1',secondTickStart)
                .attr('y2',secondTickStart + secondTickLength)
                .attr('transform',function(d){
                    return 'rotate(' + secondScale(d) + ')';
                });
        //and labels

        face.selectAll('.second-label')
                .data(d3.range(5,61,5))
                .enter()
                .append('text')
                .attr('class', 'second-label')
                .attr('text-anchor','middle')
                .attr('x',function(d){
                    return secondLabelRadius*Math.sin(secondScale(d)*radians);
                })
                .attr('y',function(d){
                    return -secondLabelRadius*Math.cos(secondScale(d)*radians) + secondLabelYOffset;
                })
                .text(function(d){
                    return d;
                });

        //... and hours
        face.selectAll('.hour-tick')
                .data(d3.range(0,12)).enter()
                .append('line')
                .attr('class', 'hour-tick')
                .attr('x1',0)
                .attr('x2',0)
                .attr('y1',hourTickStart)
                .attr('y2',hourTickStart + hourTickLength)
                .attr('transform',function(d){
                    return 'rotate(' + hourScale(d) + ')';
                });

        face.selectAll('.hour-label')
                .data(d3.range(3,13,3))
                .enter()
                .append('text')
                .attr('class', 'hour-label')
                .attr('text-anchor','middle')
                .attr('x',function(d){
                    return hourLabelRadius*Math.sin(hourScale(d)*radians);
                })
                .attr('y',function(d){
                    return -hourLabelRadius*Math.cos(hourScale(d)*radians) + hourLabelYOffset;
                })
                .text(function(d){
                    return d;
                });


        var hands = face.append('g').attr('id','clock-hands' + guid);

        face.append('g').attr('id','face-overlay')
                .append('circle').attr('class','hands-cover')
                .attr('x',0)
                .attr('y',0)
                .attr('r',clockRadius/20);

        hands.selectAll('line')
                .data(handData)
                .enter()
                .append('line')
                .attr('class', function(d){
                    return d.type + '-hand';
                })
                .attr('x1',0)
                .attr('y1',function(d){
                    return d.balance ? d.balance : 0;
                })
                .attr('x2',0)
                .attr('y2',function(d){
                    return d.length;
                })
                .attr('transform',function(d){
                    return 'rotate('+ d.scale(d.value) +')';
                });
                
        //calls the postRender of every type of clock
        if(this.postRender !== undefined)
            this.postRender(guid);
    }
};

var timerClock = {
    postRender : function(guid){
        $('#btns').append(' \
            <p><button onclick="startTimerOnClick('+guid+');">Start</button> \
            <button onclick="pauseTimerOnClick('+guid+');">Stop</button></p>');
    }
};

var stopWatchClock = {
    postRender : function(guid){
        $('#stopWatchTab .timer_box #'+guid+'_link').append(' \
            <p><button onclick="startTimerOnClick('+guid+');">Start</button> \
            <button onclick="pauseTimerOnClick('+guid+');">Pause</button> \
            <button onclick="resetTimerOnClick('+guid+');">Reset</button></p>');
    }
};

var countDownClock = {
    postRender : function(guid){
        $('#btns').append(' \
            <p><button onclick="startCountDownOnClick('+guid+');">Start</button> \
            <button onclick="stopCountDownOnClick('+guid+');">Stop</button></p>');
    }
};

var lapTimerClock = {
    postRender : function(guid){
        //append the buttons in every clock
        $('#lapTimeTab .timer_box #'+guid+'_link').append(' \
            <button onclick="startLapTimerOnClick('+guid+');" type="button" class="btn btn-primary"><span class="glyphicon glyphicon-ok"></span> Start</button> \
            <button onclick="stopLapTimerOnClick('+guid+');"type="button" class="btn btn-danger"><span class="glyphicon glyphicon-remove"></span> Stop</button> \
            <button onclick="splitTimerOnClick('+guid+');"type="button" class="btn btn-danger"><span class="glyphicon glyphicon-remove"></span> Lap</button>');
    }
};

var playSound = {
    go : function() {
        var audioElement = document.createElement('audio');
        audioElement.setAttribute('src', 'http://www.kessels.com/CatSounds/tweety4.wav');
        //audioElement.setAttribute('autoplay', 'autoplay');
        audioElement.load();
        $.get();
        audioElement.addEventListener("load", function() {
            audioElement.play();
        }, true);

        audioElement.play();

        /* uncomment it and add to view buttons play / pause for controls

        $('.play').click(function() {
            audioElement.play();
        });

        $('.pause').click(function() {
            audioElement.pause();
        });
        */

    }
};

var digitalTimer = {
    render : function() {
        digitalTimer.preRender();
        var dd = document.getElementsByClassName('digital_display')[0],
            start = document.getElementById('start'),
            stop = document.getElementById('stop'),
            clear = document.getElementById('clear'),
            seconds = 0, minutes = 0, hours = 0,
            t;
            st_clkd = 0;

        function add() {
            seconds++;
            if (seconds >= 60) {
                seconds = 0;
                minutes++;
                if (minutes >= 60) {
                    minutes = 0;
                    hours++;
                }
            }
            dd.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00")
                + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00")
                + ":" + (seconds > 9 ? seconds : "0" + seconds);

            timer();
        }
        function timer() {
            t = setTimeout(add, 1000);
        }

        /*comment this if not auto-start*/
        if(!st_clkd)
        {
            timer();
            st_clkd = 1;
        }


        /* Start button */
        start.onclick = function(){
            if(!st_clkd)
            {
                timer();
                st_clkd = 1;
            }
        }        

        /* Stop button */
        stop.onclick = function() {
            clearTimeout(t);
            playSound.go();
            st_clkd = 0;
        };

        /* Clear button */
        clear.onclick = function() {
            dd.textContent = "00:00:00";
            seconds = 0; minutes = 0; hours = 0;
        };
    },
    preRender : function(){

        $('.btns').append(' \
            <button id="start">start</button> \
            <button id="stop">stop</button> \
            <button id="clear">clear</button>');
    }
};

/*Moves the hands of a clock (world clock)*/
function moveHands(area){
    d3.select('#clock-hands'+area).selectAll('line')
            .data(handData)
            .transition()
            .attr('transform',function(d){
                return 'rotate('+ d.scale(d.value) +')';
            });
}

/*Moves the hands of a stopwatch*/
function moveTimerHands(guid){
    d3.select("#clock-hands"+guid).selectAll('line')
            .data(timerData[guid])
            .transition()
            .attr('transform',function(d){
                    return 'rotate('+ d.scale(d.value) +')';
             });
}

/*Moves the hands of a lap timer*/
function moveLapTimerHands(guid){
    d3.select('#clock-hands'+guid).selectAll('line')
            .data(lapTimerData[guid])
            .transition()
            .attr('transform',function(d){
                return 'rotate('+ d.scale(d.value) +')';
            });
}

function moveCountDownHands(guid, area){
    d3.select('#clock-hands'+area).selectAll('line')
            .data(window[guid])
            .transition()
            .attr('transform',function(d){
                if(window[guid][0].value === 0 && window[guid][1].value === 0 && window[guid][2].value === 0) {
                    stopCountDownOnClick(guid);
                }
                return 'rotate('+ -1 * ( d.scale(d.value) ) +')';
            });
}

/*Updates the values of the clock (world clock) according to its offset or Timezone
*/
function updateData(offset,guid){
    var t = new Date();
    var localTime = t.getTime();
    var localOffset = t.getTimezoneOffset() * 60000;
    var utc = localTime + localOffset;
    var result = utc + (3600000*offset); // here we get time with offset.
    var nd = new Date(result);

    handData[0].value = (nd.getHours() % 12) + nd.getMinutes()/60;
    handData[1].value = nd.getMinutes();
    handData[2].value = nd.getSeconds();

    if(!isNaN(handData[1].value))
    {
        if(handData[0].value > 9)
            handData[1].value > 9 ? $("#"+guid+"_link .digital_display").text(Math.floor(handData[0].value)+":"+handData[1].value) : $("#"+guid+"_link .digital_display").text(Math.floor(handData[0].value)+":0"+handData[1].value);
        else
            handData[1].value > 9 ? $("#"+guid+"_link .digital_display").text("0"+Math.floor(handData[0].value)+":"+handData[1].value) : $("#"+guid+"_link .digital_display").text("0"+Math.floor(handData[0].value)+":0"+handData[1].value);
    }
}

/*Updates the timerData and its values
* guid here is an id attribute already
*/
function updateTimer(guid)
{

    if(typeof timerData[guid] === 'undefined') {   //check if the specific timerData is already defined
        timerData[guid] = [
            {
                type:'hour',
                value:0,
                length:-hourHandLength,
                scale:hourScale
            },
            {
                type:'minute',
                value:0,
                length:-minuteHandLength,
                scale:minuteScale
            },
            {
                type:'second',
                value:0,
                length:-secondHandLength,
                scale:secondScale,
                balance:secondHandBalance
            }
        ];
    }
   
    timerData[guid][2].value +=1;

    if(timerData[guid][2].value == 60) {
        timerData[guid][2].value = 0;
        timerData[guid][1].value +=1;
        timerData[guid][0].value = timerData[guid][1].value/60;
    }
}

function updateLapTimer(guid) 
{
    if(typeof lapTimerData[guid] === 'undefined') {   //check if the specific timerData is already defined
        lapTimerData[guid] = [
            {
                type:'hour',
                value:0,
                length:-hourHandLength,
                scale:hourScale
            },
            {
                type:'minute',
                value:0,
                length:-minuteHandLength,
                scale:minuteScale
            },
            {
                type:'second',
                value:0,
                length:-secondHandLength,
                scale:secondScale,
                balance:secondHandBalance
            }
        ];
    }

    lapTimerData[guid][2].value +=1;

    if(lapTimerData[guid][2].value == 60) {
        lapTimerData[guid][2].value = 0;
        lapTimerData[guid][1].value +=1;
        lapTimerData[guid][0].value = lapTimerData[guid][1].value/60;
    }
}

function updateCountDown(guid, counter) 
{
    if(typeof window[guid] === 'undefined') {
        window[guid] = [
            {
                type:'hour',
                value:0,
                length:-hourHandLength,
                scale:hourScale
            },
            {
                type:'minute',
                value:0,
                length:-minuteHandLength,
                scale:minuteScale
            },
            {
                type:'second',
                value:0,
                length:-secondHandLength,
                scale:secondScale,
                balance:secondHandBalance
            }
        ];
    }

    counter = typeof counter !== 'undefined' ? counter : 0;
    if(counter === 0) {
        counter +=1;
    }
    if(counter > 0) {
        window[guid][2].value +=1;

        if(window[guid][2].value === 60) {
            window[guid][2].value = 0;
            window[guid][1].value +=1;
            window[guid][0].value = window[guid][1].value/60;
        }
    }
}


//updates the time the specific stopwatch takes
function updateStopTime(guid)
{
    if(stopTime[guid].seconds == 60)
    {
        stopTime[guid].seconds = 0;
        if(stopTime[guid].minutes == 60)
        {
            stopTime[guid].minutes = 0;
            if(stopTime[guid].hours == 12)
            {
                stopTime[guid].hours = 0;
                stopTime[guid].hours++;
            }
            else
            {
                stopTime[guid].hours++;
            }
            stopTime[guid].minutes++;
        }
        else
        {
            stopTime[guid].minutes++;
        }
        stopTime[guid].seconds++;
    }
    else
    {
        stopTime[guid].seconds++;
    }
}

function updateSplitTime(guid)
{
    if(splitTime[guid].seconds == 60)
    {
        splitTime[guid].seconds = 0;
        if(splitTime[guid].minutes == 60)
        {
            splitTime[guid].minutes = 0;
            if(splitTime[guid].hours == 12)
            {
                splitTime[guid].hours = 0;
                splitTime[guid].hours++;
            }
            else
            {
                splitTime[guid].hours++;
            }
            splitTime[guid].minutes++;
        }
        else
        {
            splitTime[guid].minutes++;
        }
        splitTime[guid].seconds++;
    }
    else
    {
        splitTime[guid].seconds++;
    }
}


/*
 * variables for start and end of time counter
 * */
var stopTime = {    //for the stopwatch
    hours: 0,
    minutes: 0,
    seconds: 0
};

var splitTime = {   //for the laptimer
    hours: 0,
    minutes: 0,
    seconds: 0
};

var interval;
var timerStarted = [],
        lapTimerStarted = [],
        countDownStarted = [];

/*Starts the stopwatch
*Remember that guid is still an HTML element
*/
function startTimerOnClick(guid) {
    if(timerStarted[guid.id] === true) {    //return 1 only if the stopwatch is already started
        return 1;
    }
    timerStarted[guid.id] = true; // set the specific stopwatch to true

    //define specific stopTime
    if(typeof stopTime[guid.id] === 'undefined'){ 
        stopTime[guid.id] = {
            hours: 0,
            minutes: 0,
            seconds: 0
        };
    }

    d3.select('#'+guid.id+'_link .digital_display').text("");
    //set interval by 1 sec
    window[guid.id+'_link'] = setInterval(function(){
        updateTimer(guid.id);
        moveTimerHands(guid.id);
        updateStopTime(guid.id);
    }, 1000);
}
/*Pauses the stopwatch*/
function pauseTimerOnClick(guid) {
    timerStarted[guid.id] = false;              //set the specific stopwatch to false to be able to start again

    clearInterval(window[guid.id+'_link']);     //clears the interval of specific element of stopwatch
 
    d3.select('#'+guid.id+'_link .digital_display').text((stopTime[guid.id].hours )
    + 'h : ' + (stopTime[guid.id].minutes)
    + 'm : ' +(stopTime[guid.id].seconds) + 's');
}

//resets the values of the specific stopwatch
function resetTimerOnClick(guid)
{
    stopTime[guid.id].hours = 0;
    stopTime[guid.id].minutes = 0;
    stopTime[guid.id].seconds = 0;
    timerData[guid.id][0].value = 0;
    timerData[guid.id][1].value = 0;
    timerData[guid.id][2].value = 0;
    moveTimerHands(guid.id);
    clearInterval(window[guid.id+'_link']);     //clears the interval of specific element of stopwatch
    timerStarted[guid.id] = false;  //set specific timer to false
}

//starts the specific lap timer
function startLapTimerOnClick(guid) {
    if(lapTimerStarted[guid.id] === true) {
        return 1;
    }
    lapTimerStarted[guid.id] = true;

    if(typeof splitTime[guid.id] === 'undefined')
    {
        splitTime[guid.id] = {
            hours: 0,
            minutes: 0,
            seconds: 0
        };
    }

    window[guid.id+'lap'] = setInterval(function(){
        updateLapTimer(guid.id);
        moveLapTimerHands(guid.id);
        updateSplitTime(guid.id);
    }, 1000);
}

//pauses the specific lap timer
function stopLapTimerOnClick(guid) {
    lapTimerStarted[guid.id] = false; // set the specific lap timer to false

    clearInterval(window[guid.id+'lap']); //clear the interval of a specific lap timer

    d3.select('#'+guid.id+'_link .digital_display').text((splitTime[guid.id].hours )
    + 'h : ' + (splitTime[guid.id].minutes)
    + 'm : ' +(splitTime[guid.id].seconds) + 's');
}

//displays the current splitted time on specific lap timer
function splitTimerOnClick(guid) {
    //append the split time
    $('#'+guid.id+'_link .laptime_display').append('You successfully split '+splitTime[guid.id].hours+'h :'+splitTime[guid.id].minutes+'m :'+splitTime[guid.id].seconds+'s<hr />');
}


function startCountDownOnClick(guid) {
    if(countDownStarted[guid] === true) {
        return 1;
    }
    countDownStarted[guid] = true;

    before.hours = new Date().getHours();
    before.minutes = new Date().getMinutes();
    before.seconds = new Date().getSeconds();

    window[guid+'count'] = setInterval(function(){
        updateCountDown(guid);
        moveCountDownHands(guid, guid);
    }, 1000);
}

function stopCountDownOnClick(guid) {
    countDownStarted[guid] = false;
    after.hours = new Date().getHours();
    after.minutes = new Date().getMinutes();
    after.seconds = new Date().getSeconds();

    clearInterval(window[guid+'count']);

    alert((after.hours - before.hours)
    + 'h : ' + (after.minutes - before.minutes)
    + 'm : ' +(after.seconds - before.seconds) + 's');
}

function resetTimer(guid) {
    timerData[2].value=0;
    timerData[1].value=0;
    timerData[0].value=60;
    moveTimerHands(guid);
}

function initCountDownTimer(guid, time) {

    if(typeof window[guid] === 'undefined') {
        window[guid] = [
            {
                type:'hour',
                value:0,
                length:-hourHandLength,
                scale:hourScale
            },
            {
                type:'minute',
                value:0,
                length:-minuteHandLength,
                scale:minuteScale
            },
            {
                type:'second',
                value:0,
                length:-secondHandLength,
                scale:secondScale,
                balance:secondHandBalance
            }
        ];
    }

    if (time < 60) {
        window[guid][2].value = -(time + 1); // - | + for correct view set up
        window[guid][1].value = 0;
        window[guid][0].value = 0;
    }

    if (time >= 60 && time < 3600) {
        window[guid][2].value = -( (time % 60) ) - 1;
        window[guid][1].value = -( ( time - (time % 60) ) / 60 );
        window[guid][0].value = 0;
    }

    if (time >= 3600) {
        window[guid][2].value = -( ( ( time % 3600 ) % 60 ) + 1 );
        window[guid][1].value = -( ( time - ( time - ( time % 3600 ) ) - ( ( time % 3600 ) % 60 ) ) / 60 );
        window[guid][0].value = -( ( time - ( time % 3600 ) ) / 3600 );
    }
}

d3.select(self.frameElement).style("height", height + "px");