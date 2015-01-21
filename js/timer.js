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
        temp = 0; //used in countdown
        alarm_time = [];    //storage for the specific clock alarm time
        alarm = [];         //just a storage for text
        alarmCount = [];    //used as a counter
        ampm = [];          //am or pm for the local time according to the inputted timezone

var activeTab = "#home";

var hourScale = d3.scale.linear()
        .range([0,330])
        .domain([0,11]);

var minuteScale = secondScale = d3.scale.linear()
        .range([0,354])
        .domain([0,59]);

//world clocks data
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

var holder=0;

var clockObject = [];
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
        //append the output to the active tab
        if(view['type'] !== 'undefined')
        {
            //check the specific column where the timer is to be placed
            if($(".tab-pane.active>.column1").children().length < 1) holder = 1;        //column 1 has no children
            else if($(".tab-pane.active>.column2").children().length < 1) holder = 2;   //column 2 has no children
            else if($(".tab-pane.active>.column3").children().length < 1) holder = 3;   //column 3 has no children
            else    //all columns have children
            {
                if(holder != 3) holder++;
                else holder = 1;
            }
            activeTab = $(".nav .active > a").attr("href");

            // after save global | local pressed activeTab somehow equals '#'
            // next line is fix

            switch(view['type'])
            {
                case '1':
                    $(activeTab+' > .timer_holder.column'+holder).append(output);
                    break;
                case '2':
                    /**
                     * if isset alarm_time, send post request with given time.
                     * maybe also need send date?
                     *
                     * need send this data to controller which can insert into database
                     */
                    if(typeof view['alarm_time'] !== 'undefined') {
                        $.ajax({
                            type: "POST",
                            url: "#",
                            data: "time=" + view['alarm_time'],
                            cache: false,
                            success: function(msg) {
                                alert('Alarm time: ' + view['alarm_time']);
                            }
                        });
                    }

                    $(activeTab+' > .timer_holder.column'+holder).append(output);
                    alarm_time[guid] = view['alarm_time'].split(":");
                    alarm_time[guid][0] = parseInt(alarm_time[guid][0]);
                    alarm_time[guid][1] = parseInt(alarm_time[guid][1]);

                    //afternoon time
                    if(alarm_time[guid][0] > 12)
                    {
                        alarm_time[guid][0] = alarm_time[guid][0]%12;
                        alarm_time[guid][2] = "PM";
                    }
                    else    //morning time
                    {
                        alarm_time[guid][2] = "AM";
                    }

                    alarm[guid] = alarm_time[guid][0]+":"+alarm_time[guid][1]+" "+alarm_time[guid][2];
                    break;
                case '3':

                    $(activeTab+' > .timer_holder.column'+holder).append(output);

                    //initialize first the countdown data
                    if(typeof handData[guid] === 'undefined')
                    {
                        var formattedTime = view['time'].split(":"); //split the inputted time to an array
                        //check if seconds is 0 while the others are not
                        if(parseInt(formattedTime[2]) == 0 &&
                            (parseInt(formattedTime[1]) != 0 ||
                            parseInt(formattedTime[0]) != 0))
                        {
                            formattedTime[2] = 60;
                            //check if the minute is not 0
                            if(formattedTime[1] > 0)
                                formattedTime[1] -= 1;  //decrement if not 0
                            else if(formattedTime[1] == 0)  //check if minute is 0
                            {
                                if(formattedTime[0] > 0)    //check if hour is not 0
                                {
                                    formattedTime[0]-=1;    //decrement hour
                                    formattedTime[1] = 59;  //set the minutes to 59
                                }
                            }
                        }
                        handData[guid] = [{
                                type:'hour',
                                value:parseInt(formattedTime[0]),
                                length:-hourHandLength,
                                scale:hourScale
                            },
                            {
                                type:'minute',
                                value:parseInt(formattedTime[1]),
                                length:-minuteHandLength,
                                scale:minuteScale
                            },
                            {
                                type:'second',
                                value:parseInt(formattedTime[2]),
                                length:-secondHandLength,
                                scale:secondScale,
                                balance:secondHandBalance
                            }];
                    }

                    break;
                case '4':
                    $(activeTab+' > .timer_holder.column'+holder).append(output);
                    break;
                case '5':
                    $(activeTab+' > .timer_holder.column'+holder).append(output);
                    break;
                default:
                    $(activeTab+' > .timer_holder.column'+holder).append(output);   
                    break;
            }
        }
        
        // clicking on a timer to edit
        $('#' + guid + '_link').on('click', function(){
            
            $('#title').val(clocks[guid].title);
            $('#size').val(clocks[guid].size);
            $('#timezone').val(clocks[guid].timezone);
            
            ui.set_type(clocks[guid].type, true);
        });

        $('#' + guid + '_link.5').on('click', function(){
            var t = "<div>Splitted Times:</div>";

            for(var i=1; i<lapTime[guid].length; i++)
            {
                t += "<div class=lapTime"+i+">"+i+") "+lapTime[guid][i][0]+":"+lapTime[guid][i][1]+":"+lapTime[guid][i][2]+"</div>";   
            }
            $(".lapTimeHolder").html(t);
        });

        //updateData(offset);	//draw them in the correct starting position

        if(view['type'] !== 'undefined')
        {
            if(view['type'] == '1' || view['type'] == '2')
            {
                clockObject[guid] = setInterval(function(){
                    updateData(offset,guid,view['type']);
                    moveHands(guid);

                    //check if it is an alarm clock
                    if(view['type'] == '2')
                    {
                        if(typeof alarmCount[guid] == 'undefined')
                        {
                            alarmCount[guid] = 0;
                        }
                        //check if hour and minutes is already equal to the selected alarm time
                        if(Math.floor(handData[0].value) == alarm_time[guid][0] &&
                            handData[1].value == alarm_time[guid][1] && alarm_time[guid][2] == ampm[guid])
                        {
                            alarmCount[guid]++;
                            if(handData[2].value%10==0) //play the alarm sound every 10 seconds of the alarm time
                            {
                                alarm.playSound(); //play the alarm sound if it's time
                                alarm.flashTaskbar(); // also flash the task bar
                            }
                            if(alarmCount[guid] == 1)
                            {
                                $(activeTab+' .timer_box #'+guid+'_link').append(' \
                                    <p><button id="'+guid+'_snooze" onclick="snooze('+guid+');">Snooze (10 min)</button></p>');
                            }
                        }
                    }

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
        d3.select(activeTab+' .timer_box #'+guid+'_link .digital_display').text("Alarm time: "+alarm[guid]);
    }
};

var stopWatchClock = {
    postRender : function(guid){
        $(activeTab+' .timer_box #'+guid+'_link').append(' \
            <p><button onclick="startTimerOnClick('+guid+');">Start</button> \
            <button onclick="pauseTimerOnClick('+guid+');">Pause</button> \
            <button onclick="resetTimerOnClick('+guid+');">Reset</button></p>');
    }
};

var countDownClock = {
    postRender : function(guid){
        $(activeTab+' .timer_box #'+guid+'_link').append(' \
            <p><button onclick="startCountDownOnClick('+guid+');">Start</button> \
            <button onclick="stopCountDownOnClick('+guid+');">Stop</button></p>');
    }
};

var lapTimerClock = {
    postRender : function(guid){
        //append the buttons in every clock
        $(activeTab+' .timer_box #'+guid+'_link').append(' \
            <button onclick="startLapTimerOnClick('+guid+');" type="button" class="btn btn-primary"><span class="glyphicon glyphicon-ok"></span> Start</button> \
            <button onclick="stopLapTimerOnClick('+guid+');"type="button" class="btn btn-danger"><span class="glyphicon glyphicon-remove"></span> Stop</button> \
            <button onclick="splitTimerOnClick('+guid+');"type="button" class="btn btn-danger"><span class="glyphicon glyphicon-remove"></span> Lap</button>');
    }
};

var alarm = {
    playSound : function() {
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

    },
    flashTaskbar : function(){
        var msg = "----";
        setInterval(function() {
            document.title = document.title == msg ? '###' : msg;
        }, 1000);
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
            alarm.playSound();
            alarm.flashTaskbar();
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
            .data(handData[guid])
            .transition()
            .attr('transform',function(d){
                    return 'rotate('+ d.scale(d.value) +')';
             });
}

/*Moves the hands of a lap timer*/
function moveLapTimerHands(guid){
    d3.select('#clock-hands'+guid).selectAll('line')
            .data(handData[guid])
            .transition()
            .attr('transform',function(d){
                return 'rotate('+ d.scale(d.value) +')';
            });
}

function moveCountDownHands(guid){
    d3.select('#clock-hands'+guid).selectAll('line')
            .data(handData[guid])
            .transition()
            .attr('transform',function(d){
                return 'rotate('+ d.scale(d.value)  +')';
            });
}

/*Updates the values of the clock (world clock) according to its offset or Timezone
*/
function updateData(offset,guid,type){
    var t = new Date();
    var localTime = t.getTime();
    var localOffset = t.getTimezoneOffset() * 60000;
    var utc = localTime + localOffset;
    var result = utc + (3600000*offset); // here we get time with offset.
    var nd = new Date(result);

    if(nd.getHours() < t.getHours() && nd.getHours() < 12)
    {
        ampm[guid] = "AM";
    }
    else
    {
        ampm[guid] = "PM";
    }

    var tempHour = nd.getHours() % 12;
    if(tempHour == 0)
        tempHour = 12;

    handData[0].value = tempHour + nd.getMinutes()/60;
    handData[1].value = nd.getMinutes();
    handData[2].value = nd.getSeconds();

    //do not overwrite the text of alarm clock
    if(type != '2')
    {
        if(!isNaN(handData[1].value))
        {
            if(handData[0].value > 9)
                handData[1].value > 9 ? $("#"+guid+"_link .digital_display").text(Math.floor(handData[0].value)+":"+handData[1].value+" "+ampm[guid]) : $("#"+guid+"_link .digital_display").text(Math.floor(handData[0].value)+":0"+handData[1].value+" "+ampm[guid]);
            else
                handData[1].value > 9 ? $("#"+guid+"_link .digital_display").text("0"+Math.floor(handData[0].value)+":"+handData[1].value+" "+ampm[guid]) : $("#"+guid+"_link .digital_display").text("0"+Math.floor(handData[0].value)+":0"+handData[1].value+" "+ampm[guid]);
        }
    }
    else
    {
        if(handData[0].value > 9)
            handData[1].value > 9 ? $("#"+guid+"_link .digital_display").html(Math.floor(handData[0].value)+":"+handData[1].value+" "+ampm[guid]+"<br/>Alarm time: "+alarm_time[guid][0]+":"+alarm_time[guid][1]+" "+alarm_time[guid][2]) : $("#"+guid+"_link .digital_display").html(Math.floor(handData[0].value)+":0"+handData[1].value+" "+ampm[guid]+"<br/>Alarm time: "+alarm_time[guid][0]+":"+alarm_time[guid][1]+" "+alarm_time[guid][2]);
        else
            handData[1].value > 9 ? $("#"+guid+"_link .digital_display").html("0"+Math.floor(handData[0].value)+":"+handData[1].value+" "+ampm[guid]+"<br/>Alarm time: "+alarm_time[guid][0]+":"+alarm_time[guid][1]+" "+alarm_time[guid][2]) : $("#"+guid+"_link .digital_display").html("0"+Math.floor(handData[0].value)+":0"+handData[1].value+" "+ampm[guid]+"<br/>Alarm time: "+alarm_time[guid][0]+":"+alarm_time[guid][1]+" "+alarm_time[guid][2]);
    }
}

/*Updates the timerData and its values
* guid here is an id attribute already
*/
function updateTimer(guid)
{

    if(typeof handData[guid] === 'undefined') {   //check if the specific timerData is already defined
        handData[guid] = [
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
   
    handData[guid][2].value +=1;

    if(handData[guid][2].value == 60) {
        handData[guid][2].value = 0;
        handData[guid][1].value +=1;
        handData[guid][0].value = handData[guid][1].value/60;
    }
}

function updateLapTimer(guid) 
{
    if(typeof handData[guid] === 'undefined') {   //check if the specific timerData is already defined
        handData[guid] = [
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

    handData[guid][2].value +=1;

    if(handData[guid][2].value == 60) {
        handData[guid][2].value = 0;
        handData[guid][1].value +=1;
        handData[guid][0].value = handData[guid][1].value/60;
    }
}

function updateCountDown(guid) 
{
    handData[guid][2].value -=1;   //decrement the seconds
    if(handData[guid][2].value == 0)   //check if the seconds is 0
    {
        if(handData[guid][0].value == 0 && handData[guid][1].value == 0 && handData[guid][2].value == 0) //time is up
        {
            //stop the countdown
            countDownStarted[guid] = false;
            clearInterval(clockObject[guid]);
        }
        else
        {
            handData[guid][2].value = 60;
            if(handData[guid][1].value != 0)
            {
                handData[guid][1].value-=1;
            }
            else
            {
                if(handData[guid][0].value > 0)
                    temp+=1;    // increment the temp for a decremented hour
                handData[guid][1].value = 59;  //set the minutes for another hour
            } 
        }
    }
    if(handData[guid][0].value > 0)
    {
        handData[guid][0].value -= temp;   //decrement the hour by the previous offset
        handData[guid][0].value += (handData[guid][1].value/60);  //update the hour data by the new offset determined by minute value
        temp = (handData[guid][1].value/60);   //update the temp with the new offset
    }
    else
        handData[guid][0].value = 0;

    if(handData[guid][1].value != 0)
        d3.select('#'+guid+'_link .digital_display').text(Math.floor(handData[guid][0].value)+"h :"+handData[guid][1].value+"m :"+handData[guid][2].value+"s");
    else
        d3.select('#'+guid+'_link .digital_display').text(Math.ceil(handData[guid][0].value)+"h :"+handData[guid][1].value+"m :"+handData[guid][2].value+"s");
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

var lapTime = {
    hours: 0,
    minutes: 0,
    seconds: 0
};

var interval;
var timerStarted = [],
        lapTimerStarted = [],
        countDownStarted = [];


//snoozes the alarm clock
function snooze(guid){
    alarm_time[guid.id][1]+=10;             //increment the minutes with 10 minutes
    if(alarm_time[guid.id][1] == 60)        //check if it falls to an hour
    {
        alarm_time[guid.id][0] += 1;        //increment the hour by 1
        alarm_time[guid.id][1] = 0;         //reset the minutes to 0
    }
    else if(alarm_time[guid.id][1] > 60)    //if minutes is greater than 60
    {
        alarm_time[guid.id][1] -= 60;       //get the excess value and store to minutes
        alarm_time[guid.id][0] += 1;        //increment the hour
    }
    if(alarm_time[guid.id][0] == 13)        //if the hour is 13 set it to 1
    {
        alarm_time[guid.id][0] = 1;
        if(alarm_time[guid.id][2] == "AM")  //check if it is am or pm after making it on one oclock
            alarm_time[guid.id][2] = "PM";
        else
            alarm_time[guid.id][2] = "AM";
    }

    alarmCount[guid.id] = 0;
    $("p > button#"+guid.id+"_snooze").remove();

    //d3.select(activeTab+' .timer_box #'+guid.id+'_link .digital_display').text("Alarm time: "+alarm_time[guid.id][0]+":"+alarm_time[guid.id][1]);
}

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
    clockObject[guid.id] = setInterval(function(){
        updateTimer(guid.id);
        moveTimerHands(guid.id);
        updateStopTime(guid.id);
    }, 1000);
}
/*Pauses the stopwatch*/
function pauseTimerOnClick(guid) {
    timerStarted[guid.id] = false;              //set the specific stopwatch to false to be able to start again

    clearInterval(clockObject[guid.id]);     //clears the interval of specific element of stopwatch
 
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
    handData[guid.id][0].value = 0;
    handData[guid.id][1].value = 0;
    handData[guid.id][2].value = 0;
    moveTimerHands(guid.id);
    clearInterval(clockObject[guid.id]);     //clears the interval of specific element of stopwatch
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

    clockObject[guid.id] = setInterval(function(){
        updateLapTimer(guid.id);
        moveLapTimerHands(guid.id);
        updateSplitTime(guid.id);
    }, 1000);
}

//pauses the specific lap timer
function stopLapTimerOnClick(guid) {
    lapTimerStarted[guid.id] = false; // set the specific lap timer to false

    clearInterval(clockObject[guid.id]); //clear the interval of a specific lap timer

    d3.select('#'+guid.id+'_link .digital_display').text((splitTime[guid.id].hours )
    + 'h : ' + (splitTime[guid.id].minutes)
    + 'm : ' +(splitTime[guid.id].seconds) + 's');
}

//displays the current splitted time on specific lap timer
function splitTimerOnClick(guid) {
    //append the split time
    if(typeof lapTime[guid.id] === 'undefined')
    {
        lapTime[guid.id] = [{
            hours: 0,
            minutes: 0,
            seconds: 0
        }];
    }

    lapTime[guid.id].push([lapTime[guid.id].hours = splitTime[guid.id].hours,lapTime[guid.id].minutes = splitTime[guid.id].minutes,lapTime[guid.id].seconds = splitTime[guid.id].seconds]);

    $('#'+guid.id+'_link .laptime_display').text('You successfully split '+splitTime[guid.id].hours+'h :'+splitTime[guid.id].minutes+'m :'+splitTime[guid.id].seconds+'s');
}

//starts the specific count down timer
function startCountDownOnClick(guid) {
    if(countDownStarted[guid.id] === true) {
        return 1;
    }

    if(!(handData[guid.id][0].value == 0 && handData[guid.id][1].value == 0 && handData[guid.id][2].value == 0))
    {
        countDownStarted[guid.id] = true;
        clockObject[guid.id] = setInterval(function(){
            updateCountDown(guid.id);
            moveCountDownHands(guid.id);
        }, 1000);
    }
}

//stops the specific countdown timer
function stopCountDownOnClick(guid) {
    countDownStarted[guid.id] = false;
    clearInterval(clockObject[guid.id]);
}

//removes the clock and clear its interval
function removeClock(guid){
    $("#"+guid.id+"_nav").show();
    $("#"+guid.id+"_nav").remove();
    clearInterval(clockObject[guid.id]);    //clear the interval of the closed clock to stop the specific clock process
}

function minimizeClock(guid){
    $("#"+guid.id).slideToggle();
    if($("#"+guid.id+"_nav").hasClass("hidden"))
        $("#"+guid.id+"_nav").removeClass("hidden");
    else
        $("#"+guid.id+"_nav").addClass("hidden");
}

//resets the fields
function resetFields()
{
    $("input[type=text]").val("");
    $("select").val(0);
}

d3.select(self.frameElement).style("height", height + "px");