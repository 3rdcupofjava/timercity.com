<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="../../assets/ico/favicon.png">

    <title><?=$title.' - '.$subtitle?></title>

    <link href="<?=URL::base()?>css/bootstrap.css" rel="stylesheet">
    <link href="<?=URL::base()?>css/main.css" rel="stylesheet">

    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.2/themes/smoothness/jquery-ui.css">
    
    <script type="text/javascript" src="<?=URL::base()?>js/d3.js"></script>
    
  </head>

  <body>
      
    <?php include('top_nav.php') ?>

    <?=$content?>

    <script type="text/javascript" src="<?=URL::base()?>js/jquery-2.1.0.min.js"></script>
    <script type="text/javascript" src="<?=URL::base()?>js/jquery-ui.min.js"></script>
    <script src="<?=URL::base()?>js/jquery.timepicker.js"></script>
    <!-- <script src="https://code.jquery.com/jquery-1.11.1.js"></script> -->
    <script type="text/javascript" src="<?=URL::base()?>js/bootstrap.min.js"></script>
    <script type="text/javascript" src="<?=URL::base()?>js/mustache.js"></script>
    <script type="text/javascript" src="<?=URL::base()?>js/ui.js"></script>
    <script type="text/javascript" src="<?=URL::base()?>js/main.js"></script>
    <script type="text/javascript" src="<?=URL::base()?>js/timer.js"></script>
    <script type="text/javascript" src="<?=URL::base()?>js/storage.js"></script>
    
    <script id="template_timer_box" type="x-tmpl-mustache">
        <?php include($_SERVER["DOCUMENT_ROOT"].URL::base().'application/templates/timer_box.mustache') ?>
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
      $(function() {
        $( "#sortable" ).sortable();
        $( "#sortable" ).disableSelection();
      });
    </script>

  </body>
</html>