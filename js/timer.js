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
        hourLabelYOffset = 7,
        temp = 0, //used in countdown
        alarm_time = [],    //storage for the specific clock alarm time
        alarm = [],         //just a storage for text
        alarmCount = [],    //used as a counter
        ampm = [];          //am or pm for the local time according to the inputted timezone

var hourScale = d3.scale.linear()
        .range([0,330])
        .domain([0,11]);

var minuteScale = secondScale = d3.scale.linear()
        .range([0,354])
        .domain([0,59]);

//clocks' hands data
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


//variables for start and end of time counter
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


var holder=0;
var activeTab = "#home--0";
var TBFlasher;
var useAnimatedClock;

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
        
        useAnimatedClock = $("#clockTypeDisplay").is(":checked");
        //for the clock
        var template = $('#template_timer_box').html();
        Mustache.parse(template);
        var output = Mustache.render(template, view);

        //for the minimization navigation
        var template2 = $("#min_clocks").html();
        Mustache.parse(template2);
        var output2 = Mustache.render(template2,view);

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
            
            // after save global | local pressed activeTab somehow equals '#'
            // next line is fix

            //append the minimize button
            $('.tab-pane.active .min_clock_holder').append(output2);

            switch(view['type'])
            {
                case '1':
                case 1:
                        $(activeTab+' > .timer_holder.column'+holder).append(output);
                    break;
                case '2':
                case 2:
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
                    if(alarm_time[guid][0] >= 12)
                    {
                        if(alarm_time[guid][0] != 12)
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
                case 3:
                    $(activeTab+' > .timer_holder.column'+holder).append(output);

                    //initialize first the countdown data
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

                    break;
                case '4':
                case 4:
                    $(activeTab+' > .timer_holder.column'+holder).append(output);
                    break;
                case '5':
                case 5:
                    $(activeTab+' > .timer_holder.column'+holder).append(output);
                    break;
                default:
                    $(activeTab+' > .timer_holder.column'+holder).append(output);   
                    break;
            }//end switch

            //check if the clock is minimized or not after loading then load again
            if($("#"+view['guid']+"_nav").hasClass("hidden")){
                //do nothing if the minimize navigation of the clock is not visible
                //just append the clock
            }
            else{
                //hide the minimize navigation of the specific clock
                $("#"+view['guid']+"_nav").addClass("hidden");
            }
        }
        
        // Clicking on all timer to edit.
        $('#' + guid + '_link').on('click', function(){
            $('#title').val(clocks[guid].title);
            $('#size').val(clocks[guid].clockSize);
            $('#timezone').val(clocks[guid].timezone);
            $(".lapTimeHolder").html("");

            $("#timer_types > label").siblings().removeClass('active');                                             // Remove the active radio buttons
            $("#timer_types > label input:radio[value='"+clocks[guid].type+"']").attr('checked','true');            // Set the radio button according to the clock selected
            $("#timer_types > label input:radio[value='"+clocks[guid].type+"']").parent().addClass('active');       // Add a class active to the parent of the radio button to make it highlighted
            ui.set_type(null,clocks[guid].type,false);                                                              // Call this function to set the timer_type
            
            $("#buttons_not_edit_mode").hide();         // Show the basic buttons.
            $("#buttons_edit_mode").show();             // Show the buttons for editing mode.

            $("button#save").attr("onclick","ui.set_type("+guid+","+clocks[guid].type+",true)")                     // Saving the new value.
                            .bind("click",function(){
                                $("#buttons_edit_mode").hide();
                                $("#buttons_not_edit_mode").show();
                            });

            $("button#delete").attr("onclick","removeClock("+guid+","+clocks[guid].ts_count+")")                    // Removing the clock selected.
                                .bind('click',function(){
                                    $("#buttons_edit_mode").hide();
                                    $("#buttons_not_edit_mode").show();
                                });

            $("button#cancel").on("click",function(){       // Cancels the editing mode.
                $("#buttons_not_edit_mode").show();
                $("#buttons_edit_mode").hide();
            });
        }).bind("mousedown",function (event){
            $cl = $(this);
            $cl.on("mousemove",function(){
                $(".timer_box#"+guid).css({"opacity":"0.3"});       // Make the clock less visible when dragging.
            });
        }).bind("mouseup",function(){
            $cl.unbind("mousemove");
            $(".timer_box#"+guid).css({"opacity":"1"});             // Make the clock visible when it is dropped.
        });

        // Clicking on a lap timer.
        $('#' + guid + '_link.5').on('click', function(){
            //check if the there are laptime recorded for the specific laptimer and then append it
            if(typeof lapTime[guid] !== "undefined" && lapTime[guid] !== null)
            {
                var t = "<div>Splitted Times:</div>";
                var lt_counter = 1;
                
                //get every lap time recorded and append it to the t variable as a string 
                for(var i=0; i<lapTime[guid].length; i++)
                {
                    if(lapTime[guid][i] != null){
                        t += "<div class='lapTime"+i+"'>"+lt_counter+") "+lapTime[guid][i][0]+":"+lapTime[guid][i][1]+":"+lapTime[guid][i][2]+"<button type='button' onclick='lapTimerClock.deleteLapTime("+guid+","+i+");' class='close'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button></div>";   
                        lt_counter++;
                    }
                }
                $(".lapTimeHolder").html(t); //append the final lap times to the lapTimeHolder
            }
        });

        if(view['type'] !== 'undefined')
        {
            if(view['type'] == '1' || view['type'] == '2')
            {
                clockObject[guid] = setInterval(function(){
                    clock.updateData(offset,guid,view['type']);
                    if(useAnimatedClock){
                        clock.moveHands(guid);
                    }

                    //check if it is an alarm clock
                    if(view['type'] == '2')
                    {
                        if(typeof alarmCount[guid] == 'undefined')
                        {
                            alarmCount[guid] = 0;
                        }
                        //check if hour and minutes is already equal to the selected alarm time
                        if(Math.floor(handData[guid][0].value) == alarm_time[guid][0] &&
                            handData[guid][1].value == alarm_time[guid][1] && alarm_time[guid][2] == ampm[guid])
                        {
                            alarmCount[guid]++;
                            if(handData[guid][2].value%10==0) //play the alarm sound every 10 seconds of the alarm time
                            {
                                alarm.playSound(); //play the alarm sound if it's time
                                if(alarmCount[guid] == 1)
                                    alarm.flashTaskbar(); // also flash the task bar
                            }
                            if(alarmCount[guid] == 1)
                            {
                                $(activeTab+' .timer_box #'+guid+'_link .btns').append(' \
                                    <button id="'+guid+'_snooze" onclick="timerClock.snooze('+guid+');">Snooze (10 min)</button>');
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
                .attr("height", function(){
                    if(useAnimatedClock){
                        return height;
                    }else{
                        return "30";
                    }
                })
                .attr('class', 'img-thumbnail');

        var face = svg.append('g')
                .attr('id','clock-face')
                .attr('class',function(){
                    if(!useAnimatedClock){
                        return "hidden";
                    }
                })
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
        switch(view['type']){
            case 1:
            case '1':
                break;
            case 2:
            case '2':
                timerClock.postRender(guid);
                break;
            case 3:
            case '3':
                countDownClock.postRender(guid);
                break;
            case 4:
            case '4':
                stopWatchClock.postRender(guid);
                break;
            case 5:
            case '5':
                lapTimerClock.postRender(guid);
                break;
        }

        $("#clockTypeDisplay").on('change',function(){
            useAnimatedClock = $("#clockTypeDisplay").is(':checked');
            if(useAnimatedClock){
                $('.svg_placeholder > svg').attr('height',height);
                face.attr('class','');
            }else{
                $('.svg_placeholder > svg').attr('height','30');
                face.attr('class','hidden');
            }
        });
    },
    moveHands: function(area){
        d3.select('#clock-hands'+area).selectAll('line')
        .data(handData[area])
        .transition()
        .attr('transform',function(d){
            return 'rotate('+ d.scale(d.value) +')';
        });
    },
    updateData: function (offset, guid, type){
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
        if(tempHour == 0 && ampm[guid] == "PM")
            tempHour = 12;

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

        handData[guid][0].value = tempHour + nd.getMinutes()/60;
        handData[guid][1].value = nd.getMinutes();
        handData[guid][2].value = nd.getSeconds();

        //do not overwrite the text of alarm clock
        if(type != '2')
        {
            if(!isNaN(handData[guid][1].value))
            {
                if(handData[guid][0].value > 9){
                    // if(useAnimatedClock){
                        handData[guid][1].value > 9 ? $("#"+guid+"_link .digital_display").text(Math.floor(handData[guid][0].value)+":"+handData[guid][1].value+" "+ampm[guid]) : $("#"+guid+"_link .digital_display").text(Math.floor(handData[guid][0].value)+":0"+handData[guid][1].value+" "+ampm[guid]);
                    // }else{
                    //     handData[guid][1].value > 9 ? $("#"+guid+"_link .digitalOutput").text(Math.floor(handData[guid][0].value)+":"+handData[guid][1].value+" "+ampm[guid]) : $("#"+guid+"_link .digitalOutput").text(Math.floor(handData[guid][0].value)+":0"+handData[guid][1].value+" "+ampm[guid]);
                    // }
                }else{
                    // if(useAnimatedClock){
                        handData[guid][1].value > 9 ? $("#"+guid+"_link .digital_display").text("0"+Math.floor(handData[guid][0].value)+":"+handData[guid][1].value+" "+ampm[guid]) : $("#"+guid+"_link .digital_display").text("0"+Math.floor(handData[guid][0].value)+":0"+handData[guid][1].value+" "+ampm[guid]);
                    // }else{
                    //     handData[guid][1].value > 9 ? $("#"+guid+"_link .digitalOutput").text("0"+Math.floor(handData[guid][0].value)+":"+handData[guid][1].value+" "+ampm[guid]) : $("#"+guid+"_link .digitalOutput").text("0"+Math.floor(handData[guid][0].value)+":0"+handData[guid][1].value+" "+ampm[guid]); 
                    // }
                }
            }
        }
        else
        {
            if(handData[guid][0].value > 9){
                handData[guid][1].value > 9 ? $("#"+guid+"_link .digital_display").html(Math.floor(handData[guid][0].value)+":"+handData[guid][1].value+" "+ampm[guid]+"<br/>Alarm time: "+alarm_time[guid][0]+":"+alarm_time[guid][1]+" "+alarm_time[guid][2]) : $("#"+guid+"_link .digital_display").html(Math.floor(handData[guid][0].value)+":0"+handData[guid][1].value+" "+ampm[guid]+"<br/>Alarm time: "+alarm_time[guid][0]+":"+alarm_time[guid][1]+" "+alarm_time[guid][2]);
            }else{
                handData[guid][1].value > 9 ? $("#"+guid+"_link .digital_display").html("0"+Math.floor(handData[guid][0].value)+":"+handData[guid][1].value+" "+ampm[guid]+"<br/>Alarm time: "+alarm_time[guid][0]+":"+alarm_time[guid][1]+" "+alarm_time[guid][2]) : $("#"+guid+"_link .digital_display").html("0"+Math.floor(handData[guid][0].value)+":0"+handData[guid][1].value+" "+ampm[guid]+"<br/>Alarm time: "+alarm_time[guid][0]+":"+alarm_time[guid][1]+" "+alarm_time[guid][2]);
            }
        }
    }
};

var timerClock = {
    postRender : function(guid){
        d3.select(activeTab+' .timer_box #'+guid+'_link .digital_display').text("Alarm time: "+alarm[guid]);
    },
    snooze: function (guid){
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

        //Stop the flashTaskbar and replace the document's title
        clearInterval(TBFlasher);
        document.title = "TimerCity - For all your timing needs. We have lap timers, countdown timers, count-up timers, big timers, little timers, and plenty of clocks for any part of the world.";

        alarmCount[guid.id] = 0;
        $(".btns > button#"+guid.id+"_snooze").remove();
    }
};

var stopWatchClock = {
    postRender : function(guid){
        $(activeTab+' .timer_box #'+guid+'_link .btns').append(' \
            <button onclick="stopWatchClock.start('+guid+');">Start</button> \
            <button onclick="stopWatchClock.pause('+guid+');">Pause</button> \
            <button onclick="stopWatchClock.reset('+guid+');">Reset</button>');
    }, 
    start: function (guid){     //starts the stopwatch
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

        //set interval by 1 sec
        clockObject[guid.id] = setInterval(function(){
            stopWatchClock.updateTimer(guid.id);
            stopWatchClock.moveHands(guid.id);
            stopWatchClock.updateStopTime(guid.id);
        }, 1000);
    },
    pause: function (guid){     //pauses the stopwatch
        timerStarted[guid.id] = false;              //set the specific stopwatch to false to be able to start again

        clearInterval(clockObject[guid.id]);     //clears the interval of specific element of stopwatch
    },
    reset: function (guid){     //resets the specific stopwatch
        if(typeof stopTime[guid.id] !== "undefined"){
            stopTime[guid.id].hours = 0;
            stopTime[guid.id].minutes = 0;
            stopTime[guid.id].seconds = 0;
        }
        if(typeof handData[guid.id] !== "undefined"){
            handData[guid.id][0].value = 0;
            handData[guid.id][1].value = 0;
            handData[guid.id][2].value = 0;
            stopWatchClock.moveHands(guid.id);
        }
        clearInterval(clockObject[guid.id]);     //clears the interval of specific element of stopwatch
        timerStarted[guid.id] = false;  //set specific timer to false
        d3.select('#'+guid.id+'_link .digital_display').text('0h : 0m : 0s');
    },
    updateStopTime: function (guid){    //updates the specific stoptime
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

        d3.select('#'+guid+'_link .digital_display').text((stopTime[guid].hours )
        + 'h : ' + (stopTime[guid].minutes)
        + 'm : ' +(stopTime[guid].seconds) + 's');
    },
    updateTimer: function (guid){   //Updates the timerData and its values guid here is an id attribute already
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
};

var cd_params = [{
    set: null,
    hour: null,
    minutes: null,
    seconds: null,
    stopped: null
}];

var countDownClock = {
    postRender : function(guid){
        $(activeTab+' .timer_box #'+guid+'_link .btns').append(' \
            <button onclick="countDownClock.start('+guid+');">Start</button> \
            <button onclick="countDownClock.pause('+guid+');">Pause</button> \
            <button onclick="countDownClock.stop('+guid+');">Stop</button>');
    },
    setParams : function (hours,minutes,seconds,guid){   //set the parameters for retrieving
        cd_params[guid].set = true;
        cd_params[guid].hour = hours;
        cd_params[guid].minutes = minutes;
        cd_params[guid].seconds = seconds;
    },
    start: function (guid){     //starts the countdown timer
        if(typeof cd_params[guid.id] === 'undefined' || cd_params[guid.id] === null){
            cd_params[guid.id] = [{
                set: false,
                hour: null,
                minutes: null,
                seconds: null,
                stopped: false
            }];
        }
        if(typeof cd_params[guid.id].set === 'undefined' || cd_params[guid.id].set == false){
            this.setParams(handData[guid.id][0].value,handData[guid.id][1].value,handData[guid.id][2].value,guid.id);
        }

        if((countDownStarted[guid.id] === true || countDownStarted[guid.id] === false) && !cd_params[guid.id].stopped) {
            handData[guid.id][0].value = cd_params[guid.id].hour;
            handData[guid.id][1].value = cd_params[guid.id].minutes;
            handData[guid.id][2].value = cd_params[guid.id].seconds;
        }
        cd_params[guid.id].stopped = false;

        if(!(handData[guid.id][0].value == 0 && handData[guid.id][1].value == 0 && handData[guid.id][2].value == 0)){
            //check if it is already started so that it won't give another interval to the clock 
            if(typeof countDownStarted[guid.id] === 'undefined' || countDownStarted[guid.id] === false){
                countDownStarted[guid.id] = true;
                clockObject[guid.id] = setInterval(function(){
                    countDownClock.updateCountDown(guid.id);
                    countDownClock.moveHands(guid.id);
                }, 1000);
            }
        }
    },
    pause: function(guid){       //pauses the countdown timer
        countDownStarted[guid.id] = false;
        clearInterval(clockObject[guid.id]);
        if(typeof cd_params[guid.id] !== "undefined")
            cd_params[guid.id].stopped = true;
    },
    stop: function (guid){      //stops the countdown timer
        handData[guid.id][0].value = 0;
        handData[guid.id][1].value = 0;
        handData[guid.id][2].value = 1;
        // checked if timer is paused
        if(cd_params[guid.id].stopped){
            this.start(guid);
        }
    },
    updateCountDown: function (guid){
        handData[guid][2].value -=1;   //decrement the seconds
        if(handData[guid][2].value == 0)   //check if the seconds is 0
        {
            if(handData[guid][0].value == 0 && handData[guid][1].value == 0 && handData[guid][2].value == 0) //time is up
            {
                //stop the countdown
                countDownStarted[guid] = false;
                clearInterval(clockObject[guid]);
                countDownStarted[guid] = false;
                alarm.playSound();
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
};

var lapTimerClock = {
    postRender : function(guid){
        //append the buttons in every clock
        $(activeTab+' .timer_box #'+guid+'_link .btns').append(' \
            <button onclick="lapTimerClock.start('+guid+');" type="button"><span class="glyphicon glyphicon-ok"></span> Start</button> \
            <button onclick="lapTimerClock.stop('+guid+');"type="button"><span class="glyphicon glyphicon-remove"></span> Stop</button> \
            <button onclick="lapTimerClock.split('+guid+');"type="button"><span class="glyphicon glyphicon-ok"></span> Lap</button>');
    },
    start: function (guid){     //starts the lap timer
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
            lapTimerClock.updateLapTimer(guid.id);
            lapTimerClock.moveHands(guid.id);
            lapTimerClock.updateSplitTime(guid.id);
        }, 1000);
    },
    stop: function (guid){      //stops the lap timer
        lapTimerStarted[guid.id] = false; // set the specific lap timer to false

        clearInterval(clockObject[guid.id]); //clear the interval of a specific lap timer
    },
    reset: function (guid){
        this.stop(guid);
        if(typeof handData[guid.id] !== "undefined"){
            handData[guid.id][0].value = 0;
            handData[guid.id][1].value = 0;
            handData[guid.id][2].value = 0;
        }
        if(typeof handData[guid.id] !== "undefined"){
            splitTime[guid.id].hours = 0;
            splitTime[guid.id].minutes = 0;
            splitTime[guid.id].seconds = 0;
        }
        lapTime[guid.id] = null;
    },
    split: function (guid){     //appends the splitted time
        //append the split time
        if(typeof lapTime[guid.id] === 'undefined' || lapTime[guid.id] === null)
        {
            lapTime[guid.id] = [];
        }

        //record the time splitted
        lapTime[guid.id].push([lapTime[guid.id].hours = splitTime[guid.id].hours,lapTime[guid.id].minutes = splitTime[guid.id].minutes,lapTime[guid.id].seconds = splitTime[guid.id].seconds]);

        $('#'+guid.id+'_link .laptime_display').text('You successfully split '+splitTime[guid.id].hours+'h :'+splitTime[guid.id].minutes+'m :'+splitTime[guid.id].seconds+'s');
    },
    deleteLapTime : function (guid,i){
        lapTime[guid.id][i] = null;
        var lt_counter = 1;
        var t = "<div>Splitted Times:</div>";
                
        //get every lap time recorded and append it to the t variable as a string 
        for(var i=0; i<lapTime[guid.id].length; i++)
        {
            if(lapTime[guid.id][i] != null){
                t += "<div class='lapTime"+i+"'>"+lt_counter+") "+lapTime[guid.id][i][0]+":"+lapTime[guid.id][i][1]+":"+lapTime[guid.id][i][2]+"<button type='button' onclick='lapTimerClock.deleteLapTime("+guid.id+","+i+");' class='close'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button></div>";   
                lt_counter++;
            }
        }
        $(".lapTimeHolder").html(t); //append the final lap times to the lapTimeHolder
    },
    updateSplitTime: function (guid){       //updates the split time
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
        d3.select('#'+guid+'_link .digital_display').text((splitTime[guid].hours )
        + 'h : ' + (splitTime[guid].minutes)
        + 'm : ' +(splitTime[guid].seconds) + 's');
    },
    updateLapTimer: function (guid){
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
        TBFlasher = setInterval(function() {
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

//removes the clock and clear its interval
function removeClock(guid,ts_count){
    temporary_storage[ts_count] = null;         // Remove the specific clock from the temporary_storage.
    updateSession('lsc',temporary_storage);     // Update the session for lsc.
    $("#"+guid.id+"_nav").show();
    $("#"+guid.id+"_nav").remove();
    $("#"+guid.id+".timer_box").remove();
    $(".lapTimeHolder").html("");
    clearInterval(TBFlasher);
    clearInterval(clockObject[guid.id]);        // Clear the interval of the closed clock to stop the specific clock process
}

//minimizes the specific clock
function minimizeClock(guid){
    $("#"+guid.id).slideToggle();
    $(".lapTimeHolder").html("");
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