<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="../../assets/ico/favicon.png">

    <title><?=$title.' - '.$subtitle?></title>

    <link href="/css/bootstrap.css" rel="stylesheet">
    <link href="/css/main.css" rel="stylesheet">
    
    <script type="text/javascript" src="/js/d3.js"></script>
    
  </head>

  <body>
      
    <?php include('top_nav.php') ?>

    <?=$content?>

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script type="text/javascript" src="/js/jquery-2.1.0.min.js"></script>
    <!-- <script src="https://code.jquery.com/jquery-1.11.1.js"></script> -->
    <script type="text/javascript" src="/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="/js/mustache.js"></script>
    <script type="text/javascript" src="/js/ui.js"></script>
    <script type="text/javascript" src="/js/main.js"></script>
    
    <script id="template" type="x-tmpl-mustache">
        <?php include($_SERVER["DOCUMENT_ROOT"].'/application/templates/timer_box.mustache') ?>
    </script>
    
  </body>
</html>