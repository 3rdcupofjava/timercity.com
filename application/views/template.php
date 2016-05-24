<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">    
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="../../assets/ico/favicon.png">

    <title><?=$title.' - '.$subtitle?></title>

    <!-- <link href="<?=URL::base()?>css/bootstrap.css" rel="stylesheet"> -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/css/bootstrap.min.css" integrity="sha384-y3tfxAZXuh4HwSYylfB+J125MxIs6mR5FOHamPBG064zB+AFeWH94NdvaCBm8qnd" crossorigin="anonymous">
    <link href="<?=URL::base()?>css/main.css" rel="stylesheet">
    
    <script type="text/javascript" src="<?=URL::base()?>js/d3.js"></script>
    
  </head>

  <body>
      
    <?php include('top_nav.php') ?>

    <?=$content?>

    <script type="text/javascript" src="<?=URL::base()?>js/jquery-2.1.0.min.js"></script>
    <script type="text/javascript" src="<?=URL::base()?>js/jquery-ui.min.js"></script>
    <script src="<?=URL::base()?>js/jquery.timepicker.js"></script>
    <!-- <script src="https://code.jquery.com/jquery-1.11.1.js"></script> -->
    <!-- <script type="text/javascript" src="<?=URL::base()?>js/bootstrap.min.js"></script> -->
    <script src="https://www.atlasestateagents.co.uk/javascript/tether.min.js"></script><!-- Tether for Bootstrap --> 
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.2/js/bootstrap.min.js" integrity="sha384-vZ2WRJMwsjRMW/8U7i6PWi6AlO1L79snBrmgiDpgIWJ82z8eA5lenwvxbMV1PAh7" crossorigin="anonymous"></script>
    <script type="text/javascript" src="<?=URL::base()?>js/mustache.js"></script>
    <script type="text/javascript" src="<?=URL::base()?>js/ui.js"></script>
    <script type="text/javascript" src="<?=URL::base()?>js/funcs.js"></script>
    <script type="text/javascript" src="<?=URL::base()?>js/main.js"></script>
    <script type="text/javascript" src="<?=URL::base()?>js/timer.js"></script>
    <script type="text/javascript" src="<?=URL::base()?>js/storage.js"></script>
    
    <script id="template_timer_box" type="x-tmpl-mustache">
        <?php include($_SERVER["DOCUMENT_ROOT"].URL::base().'application/templates/timer_box.mustache') ?>
    </script>
    <script id="min_clocks" type="x-tmpl-mustache">
        <?php include($_SERVER['DOCUMENT_ROOT'].URL::base().'application/templates/min_clocks.mustache') ?>
    </script>
    
    <script id="template_select" type="x-tmpl-mustache">
        <div id="{{id}}" class="btn-group" data-toggle="buttons">
            {{#options}}
                <label class="btn btn-default {{#checked}}active{{/checked}}">
                  <input type="{{type}}" id="{{id}}_{{oid}}" name="{{id}}" autocomplete="off" value="{{oid}}" {{#checked}}checked{{/checked}}> {{title}}
                </label>
            {{/options}}
        </div>
    </script>

    <script>
      $(function(){
        if(typeof(Storage) == 'undefined') // check if browser supports local storage
        {
          alert("Web Storage not supported in your browser.");
        }
      });

      $(function() {
        $( ".column1,.column2,.column3" ).sortable({connectWith:".connectedColumn"}).disableSelection();
      });

    </script>

  </body>
</html>