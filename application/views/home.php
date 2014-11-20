<div class="container-fluid" style="height:100%;">
    <div class="row" style="height:100%;">
        <!-- <<< LEFT COLUMN <<< -->
        <div id="left_col" class="col-md-3" style="background-color:#f5f5f5; padding-top: 1em; height:100%;">
            
            <input id="title" type="text" class="form-control" placeholder="Title">
            <input id="size" type="text" class="form-control" placeholder="Size" value="120">
            
            <input id="timezone" type="text" class="form-control" placeholder="Timezone" style="display:none;">
            <input id="countdown_time" type="text" class="form-control" placeholder="Time to countdown" style="display:none;">
            <input id="alarm_time" type="text" class="form-control" placeholder="Wake Up Time" style="display:none;">

            <div id="buttons_stopwatch" style="display:none;">
                <button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-ok"></span> Start</button>
                <button type="button" class="btn btn-danger"><span class="glyphicon glyphicon-remove"></span> Stop</button>
            </div>

            <div id="buttons_lap_timer" style="display:none;">
                <button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-ok"></span> Start</button>
                <button type="button" class="btn btn-danger"><span class="glyphicon glyphicon-remove"></span> Stop</button>
                <button type="button" class="btn btn-danger"><span class="glyphicon glyphicon-remove"></span> Lap / Split</button>
            </div>

            <br />
            <div id="buttons_edit_mode" style="display:none;">
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
                <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">World Clocks</a></li>
                <li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">Countdown Timers</a></li>
                <li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Add a tab</a></li>
            </ul>

            <!-- Tab panes -->
            <div class="tab-content">
              <div role="tabpanel" class="tab-pane active" id="home">
              
                <div id="timer_holder"></div>

                <!-- scrap, needs to be trashed, leaving for now for testing -->
                <div id="London" class="col-lg-4 timer_box">
                    <button type="button" class="close" data-dismiss="alert">
                      <span aria-hidden="true">&times;</span>
                      <span class="sr-only">Close</span>
                    </button>

                    <a id="London_link" href="#" class="thumbnail">
                        <div class="svg_placeholder"></div>
                        <div class="digital_display">11:11 AM</div>
                        <div class="title">Photo Title</div>
                    </a>
                </div>
                <!-- scrap, needs to be trashed, leaving for now for testing -->

              
              </div>
              <div role="tabpanel" class="tab-pane" id="profile">.o..</div>
              <div role="tabpanel" class="tab-pane" id="messages">.e..</div>
              <div role="tabpanel" class="tab-pane" id="settings">..u.</div>
            </div>
        </div>

        </div>
        <!-- >>> RIGHT COLUMN >>> -->
    </div> <!-- /.row -->
</div><!-- /.container -->