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
        var clockRadius = parseInt(view['clockSize']);
        var offset = parseInt(view['timezone']);
        var guid = view['guid'];
        clocks[guid] = view;
        
        var template = $('#template_timer_box').html();
        Mustache.parse(template);
        var output = Mustache.render(template, view);
        $('#timer_holder').append(output);
        
        // clicking on a timer to edit
        $('#' + guid + '_link').on('click', function(){
            
            $('#title').val(clocks[guid].title);
            $('#size').val(clocks[guid].size);
            $('#timezone').val(clocks[guid].timezone);
            
            ui.set_type(clocks[guid].type, true)
        });

        //updateData(offset);	//draw them in the correct starting position

        setInterval(function(){
            updateData(offset);
            moveHands(guid);
        }, 1000);

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

                this.postRender(guid);
    }
}

var timerClock = {
    postRender : function(guid){
        $('#btns').append(' \
            <p><button onclick="startTimerOnClick(\'' + guid + '\');">Start</button> \
            <button onclick="stopTimerOnClick(\'' + guid + '\');">Stop</button></p>');
    }
}
var countDownClock = {
    postRender : function(guid){
        $('#btns').append(' \
            <p><button onclick="startCountDownOnClick(\'' + guid + '\');">Start</button> \
            <button onclick="stopCountDownOnClick(\'' + guid + '\');">Stop</button></p>');

        updateCountDown(guid);
        moveCountDownHands(guid, guid);
    }
}
var countDownClock = {
    postRender : function(guid){
        $('#btns').append(' \
            <p><button onclick="startLapTimerOnClick(\'' + guid + '\');">Start</button> \
            <button onclick="splitTimerOnClick(\'' + guid + '\');">[ lap ]</button> \
            <button onclick="stopLapTimerOnClick(\'' + guid + '\');">Stop</button></p>');
    }
}


function moveHands(area){
    d3.select('#clock-hands'+area).selectAll('line')
            .data(handData)
            .transition()
            .attr('transform',function(d){
                return 'rotate('+ d.scale(d.value) +')';
            });
}

function moveTimerHands(guid, area){
    d3.select('#clock-hands'+area).selectAll('line')
            .data(window[guid])
            .transition()
            .attr('transform',function(d){
                return 'rotate('+ d.scale(d.value) +')';
            });
}

function moveLapTimerHands(guid, area){
    d3.select('#clock-hands'+area).selectAll('line')
            .data(window[guid])
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

function updateData(offset){
    var t = new Date();
    var localTime = t.getTime();
    var localOffset = t.getTimezoneOffset() * 60000;
    var utc = localTime + localOffset;
    var result = utc + (3600000*offset); // here we get time with offset.
    var nd = new Date(result);

    handData[0].value = (nd.getHours() % 12) + nd.getMinutes()/60;
    handData[1].value = nd.getMinutes();
    handData[2].value = nd.getSeconds();
}

function updateTimer(guid, counter) {

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

function updateLapTimer(guid, counter) {

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

function updateCountDown(guid, counter) {

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

/*
 * variables for start and end of time counter
 * */
var before = {
    hours: 0,
    minutes: 0,
    seconds: 0
};

var after = {
    hours: 0,
    minutes: 0,
    seconds: 0
};

var interval;
var splitter = [];
var timerStarted = [],
        lapTimerStarted = [],
        countDownStarted = [];


/*
 * this function called when start button pressed
 * and take guid from drawTimer as parameter
 * */
function startTimerOnClick(guid) {
    if(timerStarted[guid] === true) {
        return 1;
    }
    timerStarted[guid] = true;

    before.hours = new Date().getHours();
    before.minutes = new Date().getMinutes();
    before.seconds = new Date().getSeconds();

    window[guid+'tmr'] = setInterval(function(){
        updateTimer(guid);
        moveTimerHands(guid, guid);
    }, 1000);
}

/*
 * this function called when start button pressed
 * and take guid from drawTimer as parameter
 * */
function startLapTimerOnClick(guid) {
    if(lapTimerStarted[guid] === true) {
        return 1;
    }
    lapTimerStarted[guid] = true;

    before.hours = new Date().getHours();
    before.minutes = new Date().getMinutes();
    before.seconds = new Date().getSeconds();
    splitter[guid] = 0;

    window[guid+'lap'] = setInterval(function(){
        updateTimer(guid);
        moveTimerHands(guid, guid);
        splitter[guid] += 1;
    }, 1000);
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

function stopTimerOnClick(guid) {
    timerStarted[guid] = false;
    after.hours = new Date().getHours();
    after.minutes = new Date().getMinutes();
    after.seconds = new Date().getSeconds();

    clearInterval(window[guid+'tmr']);

    alert((after.hours - before.hours)
    + 'h : ' + (after.minutes - before.minutes)
    + 'm : ' +(after.seconds - before.seconds) + 's');
}

function stopLapTimerOnClick(guid) {
    lapTimerStarted[guid] = false;
    after.hours = new Date().getHours();
    after.minutes = new Date().getMinutes();
    after.seconds = new Date().getSeconds();

    clearInterval(window[guid+'lap']);

    alert((after.hours - before.hours)
    + 'h : ' + (after.minutes - before.minutes)
    + 'm : ' +(after.seconds - before.seconds) + 's');
}

/*
* works only with one timer presented
* */
function splitTimerOnClick(guid) {
    $('#txts').append('You successfully split ' + splitter[guid] + ' seconds' + '<hr />');
    splitter[guid] = 0;
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