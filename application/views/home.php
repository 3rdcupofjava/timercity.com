<div class="container-fluid" style="height:100%;">
    <div class="row" style="height:100%;">
        <!-- <<< LEFT COLUMN <<< -->
        <div id="left_col" class="col-md-3" style="background-color:#f5f5f5; padding-top: 1em; height:100%;">
            
            <input id="title" type="text" class="form-control" placeholder="Title">
            <input id="size" type="text" class="form-control" placeholder="Size" value="100">
            
            <!-- <input id="timezone" type="text" class="form-control" placeholder="Timezone" style="display:none;"> -->
            
            <select id="timezone" class="form-control">
              <option value="0">Select Timezone</option>
              <option value="-11">Pacific/Midway (UTC-11)</option>
              <option value="-11">US/Samoa (UTC-11)</option>
              <option value="-10">US/Hawaii (UTC-10)</option>
              <option value="-9">US/Alaska (UTC-9)</option>
              <option value="-8">US/Pacific (UTC-8)</option>
              <option value="-8">America/Tijuana (UTC-8)</option>
              <option value="-7">US/Arizona (UTC-7)</option>
              <option value="-7">US/Mountain (UTC-7)</option>
              <option value="-7">America/Chihuahua (UTC-7)</option>
              <option value="-7">America/Mazatlan (UTC-7)</option>
              <option value="-6">America/Mexico City (UTC-6)</option>
              <option value="-6">America/Monterrey (UTC-6)</option>
              <option value="-6">Canada/Saskatchewan (UTC-6)</option>
              <option value="-6">US/Central (UTC-6)</option>
              <option value="-5">US/Eastern (UTC-5)</option>
              <option value="-5">US/East-Indiana (UTC-5)</option>
              <option value="-5">America/Bogota (UTC-5)</option>
              <option value="-5">America/Lima (UTC-5)</option>
              <option value="-4">America/Caracas (UTC-4)</option>
              <option value="-4">Canada/Atlantic (UTC-4)</option>
              <option value="-4">America/La Paz (UTC-4)</option>
              <option value="-4">America/Santiago (UTC-4)</option>
              <option value="-3">Canada/Newfoundland (UTC-3)</option>
              <option value="-3">America/Buenos Aires (UTC-3)</option>
              <option value="-3">Greenland (UTC-3)</option>
              <option value="-2">Atlantic/Stanley (UTC-2)</option>
              <option value="-1">Atlantic/Azores (UTC-1)</option>
              <option value="-1">Altantic/Cape Verde (UTC-1)</option>
              <option value="0">Africa/Casablanca (UTC-0)</option>
              <option value="0">Europe/Dublin (UTC-0)</option>
              <option value="0">Europe/Lisbon (UTC-0)</option>
              <option value="0">Europe/London (UTC-0)</option>
              <option value="0">Africa/Monrovia (UTC-0)</option>
              <option value="1">Europe/Amsterdam (UTC+1)</option>
              <option value="1">Europe/Belgrade (UTC+1)</option>
              <option value="1">Europe/Berlin (UTC+1)</option>
              <option value="1">Europe/Bratislava (UTC+1)</option>
              <option value="1">Europe/Brussels (UTC+1)</option>
              <option value="1">Europe/Budapest (UTC+1)</option>
              <option value="1">Europe/Copenhagen (UTC+1)</option>
              <option value="1">Europe/Ljubljana (UTC+1)</option>
              <option value="1">Europe/Madrid (UTC+1)</option>
              <option value="1">Europe/Paris (UTC+1)</option>
              <option value="1">Europe/Prague (UTC+1)</option>
              <option value="1">Europe/Rome (UTC+1)</option>
              <option value="1">Europe/Sarajevo (UTC+1)</option>
              <option value="1">Europe/Skopje (UTC+1)</option>
              <option value="1">Europe/Stockholm (UTC+1)</option>
              <option value="1">Europe/Vienna (UTC+1)</option>
              <option value="1">Europe/Warsaw (UTC+1)</option>
              <option value="1">Europe/Zagreb (UTC+1)</option>
              <option value="2">Europe/Athens (UTC+2)</option>
              <option value="2">Europe/Bucharest (UTC+2)</option>
              <option value="2">Africa/Cairo (UTC+2)</option>
              <option value="2">Africa/Harare (UTC+2)</option>
              <option value="2">Europe/Helsinki (UTC+2)</option>
              <option value="2">Europe/Istanbul (UTC+2)</option>
              <option value="2">Asia/Jerusalem (UTC+2)</option>
              <option value="2">Europe/Kiev (UTC+2)</option>
              <option value="2">Europe/Minsk (UTC+2)</option>
              <option value="2">Europe/Riga (UTC+2)</option>
              <option value="2">Europe/Sofia (UTC+2)</option>
              <option value="2">Europe/Tallinn (UTC+2)</option>
              <option value="2">Europt/Vilnius (UTC+2)</option>
              <option value="3">Asia/Baghdad (UTC+3)</option>
              <option value="3">Asia/Kuwait (UTC+3)</option>
              <option value="3">Africa/Nairobi (UTC+3)</option>
              <option value="3">Asia/Riyadh (UTC+3)</option>
              <option value="3">Asia/Tehran (UTC+3)</option>
              <option value="4">Europe/Moscow (UTC+4)</option>
              <option value="4">Asia/Baku (UTC+4)</option>
              <option value="4">Europe/Volgograd (UTC+4)</option>
              <option value="4">Asia/Muscat (UTC+4)</option>
              <option value="4">Asia/Tbilisi (UTC+4)</option>
              <option value="4">Asia/Yerevan (UTC+4)</option>
              <option value="4">Asia/Kabul (UTC+4)</option>
              <option value="5">Asia/Karachi (UTC+5)</option>
              <option value="5">Asia/Tashkent (UTC+5)</option>
              <option value="5">Asia/Kolkata (UTC+5)</option>
              <option value="6">Asia/Kathmandu (UTC+6)</option>
              <option value="6">Asia/Yekaterinburg (UTC+6)</option>
              <option value="6">Asia/Almaty (UTC+6)</option>
              <option value="6">Asia/Dhaka (UTC+6)</option>
              <option value="7">Asia/Novosibirsk (UTC+7)</option>
              <option value="7">Asia/Bangkok (UTC+7)</option>
              <option value="7">Asia/Jakarta (UTC+7)</option>
              <option value="8">Asia/Krasnoyarsk (UTC+8)</option>
              <option value="8">Asia/Chongqing (UTC+8)</option>
              <option value="8">Asia/Hong Kong (UTC+8)</option>
              <option value="8">Asia/Kuala Lumpur (UTC+8)</option>
              <option value="8">Australia/Perth (UTC+8)</option>
              <option value="8">Asia/Singapore (UTC+8)</option>
              <option value="8">Asia/Taipei (UTC+8)</option>
              <option value="8">Asia/Ulaanbaatar (UTC+8)</option>
              <option value="8">Asia/Urumqi (UTC+8)</option>
              <option value="9">Asia/Irkutsk (UTC+9)</option>
              <option value="9">Asia/Seoul (UTC+9)</option>
              <option value="9">Asia/Tokyo (UTC+9)</option>
              <option value="9">Australia/Adelaide (UTC+9)</option>
              <option value="9">Australia/Darwin (UTC+9)</option>
              <option value="10">Asia/Yakutsk (UTC+10)</option>
              <option value="10">Australia/Brisbane (UTC+10)</option>
              <option value="10">Australia/Canberra (UTC+10)</option>
              <option value="10">Pacific/Guam (UTC+10)</option>
              <option value="10">Australia/Hobart (UTC+10)</option>
              <option value="10">Australia/Melbourne (UTC+10)</option>
              <option value="10">Pacific/Port Moresby (UTC+10)</option>
              <option value="10">Australia/Sydney (UTC+10)</option>
              <option value="11">Asia/Vladivostok (UTC+11)</option>
              <option value="12">Asia/Magadan (UTC+12)</option>
              <option value="12">Pacific/Auckland (UTC+12)</option>
              <option value="12">Pacific/Fiji (UTC+12)</option>
            </select>
            <input id="countdown_time" type="text" class="form-control" placeholder="00:00:00" style="display:none;">
            <input id="alarm_time" type="text" data-time-format="H:i:s" class="form-control" placeholder="00:00:00" style="display:none;">

            <br />
            <div id="buttons_edit_mode" style="display:none;">
                <button type="button" class="btn btn-primary"><span class="glyphicon glyphicon-ok"></span> Save</button>
                <button type="button" class="btn btn-danger"><span class="glyphicon glyphicon-remove"></span> Delete</button>
            </div>
            <div id="buttons_not_edit_mode">
                <button id="add" type="button" class="btn btn-primary"><span class="glyphicon glyphicon-ok"></span> Add</button>
                <button onclick="resetFields();" type="button" class="btn btn-danger"><span class="glyphicon glyphicon-remove"></span> Reset</button>
            </div>
            
        </div>
        <!-- >>> LEFT COLUMN >>> -->
        <!-- <<< RIGHT COLUMN <<< -->
        <div class="col-md-9" style="height:100%; padding: 0;">
            <?php include('sub_navs.php') ?>
            
            <div role="tabpanel">

                <!-- Nav tabs -->
                <ul class="nav nav-tabs" role="tablist">
                    <li role="presentation" class="active"><a href="#home" ondblclick="showRename()" aria-controls="home" role="tab" data-toggle="tab">Home</a></li>
                    <li role="presentation"><a href="#worldClockTab" ondblclick="showRename()" aria-controls="worldClockTab" role="tab" data-toggle="tab">World Clocks</a></li>
                    <li role="presentation"><a href="#alarmClockTab" ondblclick="showRename()" aria-controls="alarmClockTab" role="tab" data-toggle="tab">Alarm Clocks</a></li>
                    <li role="presentation"><a href="#countDownTab" ondblclick="showRename()" aria-controls="countDownTab" role="tab" data-toggle="tab">Countdown Timers</a></li>
                    <li role="presentation"><a href="#stopWatchTab" ondblclick="showRename()" aria-controls="stopWatchTab" role="tab" data-toggle="tab">Stopwatches</a></li>
                    <li role="presentation"><a href="#lapTimeTab" ondblclick="showRename()" aria-controls="lapTimeTab" role="tab" data-toggle="tab">Lap Timers</a></li>
                </ul>

                <!-- Tab panes -->
                <div class="tab-content">
                  <div role="tabpanel" class="tab-pane active" id="home">
<<<<<<< HEAD
                      <ul class="sortable timer_holder"></ul>
=======
                      <ul id="sortable" class="timer_holder">
                          <div ></div>
                      </ul>
>>>>>>> 9491cc3d6c9901aa958ad76181867265e1689ffb
                  </div>
                  <div role="tabpanel" class="tab-pane" id="worldClockTab">
                      <ul class="sortable timer_holder"></ul>
                  </div>
                  <div role="tabpanel" class="tab-pane" id="alarmClockTab">
                      <ul class="sortable timer_holder"></ul>
                  </div>
                  <div role="tabpanel" class="tab-pane" id="countDownTab">
                      <ul class="sortable timer_holder"></ul>
                  </div>
                  <div role="tabpanel" class="tab-pane" id="stopWatchTab">
                      <ul class="sortable timer_holder"></ul>
                  </div>
                  <div role="tabpanel" class="tab-pane" id="lapTimeTab">
                      <ul class="sortable timer_holder"></ul>
                  </div>
                </div>
                <!-- end of Tab panes -->
            </div>
            <!-- end of tabpanel -->
        </div>
        <!-- >>> RIGHT COLUMN >>> -->
    </div> <!-- /.row -->
</div><!-- /.container -->