<div class="container-fluid" style="height:100%;">
    <div class="row" style="height:100%;">
        <!-- <<< LEFT COLUMN <<< -->
        <div id="left_col" class="col-md-3" style="background-color:#f5f5f5; padding-top: 1em; height:100%;">
            
            <input id="title" type="text" class="form-control" placeholder="Title">
            <input id="size" type="text" class="form-control" placeholder="Size" value="100">
            
            <input id="timezone" type="text" class="form-control" placeholder="Timezone" style="display:none;">
            <input id="countdown_time" type="text" class="form-control" placeholder="Time to countdown" style="display:none;">
            <input id="alarm_time" type="text" data-time-format="H:i:s" class="form-control" placeholder="Wake Up Time" style="display:none;">

           

            <br />
            <div id="buttons_edit_mode" style="display:none;">
                <button type="button" class="btn btn-danger"><span class="glyphicon glyphicon-remove"></span> Start</button>
                <button type="button" class="btn btn-danger"><span class="glyphicon glyphicon-remove"></span> Stop</button>
                <button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-ok"></span> Save</button>
                <button type="button" class="btn btn-danger"><span class="glyphicon glyphicon-remove"></span> Delete</button>
            </div>
            <div id="buttons_not_edit_mode">
                <button id="add" type="button" class="btn btn-primary"><span class="glyphicon glyphicon-ok"></span> Add</button>
                <button type="button" class="btn btn-danger"><span class="glyphicon glyphicon-remove"></span> Reset</button>
            </div>
            
        </div>
        <!-- >>> LEFT COLUMN >>> -->
        <!-- <<< RIGHT COLUMN <<< -->
        <div class="col-md-9" style="height:100%; padding: 0;">
            <?php include('sub_navs.php') ?>
            
            <div role="tabpanel">

                <!-- Nav tabs -->
                <ul class="nav nav-tabs" role="tablist">
                    <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Home</a></li>
                    <li role="presentation"><a href="#worldClockTab" aria-controls="worldClockTab" role="tab" data-toggle="tab">World Clocks</a></li>
                    <li role="presentation"><a href="#alarmClockTab" aria-controls="alarmClockTab" role="tab" data-toggle="tab">Alarm Clocks</a></li>
                    <li role="presentation"><a href="#countDownTab" aria-controls="countDownTab" role="tab" data-toggle="tab">Countdown Timers</a></li>
                    <li role="presentation"><a href="#stopWatchTab" aria-controls="stopWatchTab" role="tab" data-toggle="tab">Stopwatches</a></li>
                    <li role="presentation"><a href="#lapTimeTab" aria-controls="lapTimeTab" role="tab" data-toggle="tab">Lap Timers</a></li>
                </ul>

                <!-- Tab panes -->
                <div class="tab-content">
                  <div role="tabpanel" class="tab-pane active" id="home">
                    <div class="timer_holder"></div>
                  </div>
                  <div role="tabpanel" class="tab-pane" id="worldClockTab">
                    <div class="timer_holder"></div>
                  </div>
                  <div role="tabpanel" class="tab-pane" id="alarmClockTab">
                    <div class="timer_holder"></div> 
                    <div id="buttons_stopwatch" style="display:none;">
               
                    </div>
                  </div>
                  <div role="tabpanel" class="tab-pane" id="countDownTab">
                    <div class="timer_holder"></div>
                  </div>
                  <div role="tabpanel" class="tab-pane" id="stopWatchTab">
                    <div class="timer_holder"></div>
                  </div>
                  <div role="tabpanel" class="tab-pane" id="lapTimeTab">
                    <div class="timer_holder"></div>
                  </div>
                </div>
                <!-- end of Tab panes -->
            </div>
            <!-- end of tabpanel -->
        </div>
        <!-- >>> RIGHT COLUMN >>> -->
    </div> <!-- /.row -->
</div><!-- /.container -->