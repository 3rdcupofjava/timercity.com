<div class="navbar navbar-inverse navbar-fixed-top">
    <div class="container-fluid">
        
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="<?= URL::base(); ?>"><?= $title ?></a>
        </div>
        <div class="collapse navbar-collapse">
            <ul class="nav navbar-nav">
              <?=$nav_list?>
            </ul><!--/.nav -->
            
            <ul class="nav navbar-nav pull-right">
                <li id="save_nav"><a id="save" href="#"><?= __('Save') ?></a></li>
                <li id="save_nav"><a id="load" href="#"><?= __('Load') ?></a></li>
                <?php if ($show_login): ?>
                    <?php /*<li id="sign_up"><a href="#"><?= __('Sign Up') ?></a></li>*/?>
                    <li id="log_in"><a href="#"><?= __('Log In') ?></a></li>
                <?php else: ?>
                    <li id="settings" class="dropdown" title="<?= __('Settings') ?>">
                        <a href="#" class="dropdown-toggle " data-toggle="dropdown">
                            <span class="glyphicon glyphicon-th-list"></span>
                            <b class="caret"></b>
                        </a>
                        <ul class="dropdown-menu pull-right">
                            <li><a href="/settings"><?= __('Settings') ?></a></li>
                            <li class="dropdown-header"><?= __('Administration') ?></li>
                            <?=$admin_nav?>
                            <li class="divider"></li>
                            <li><a href="/user/logout"><?= __('Log Out') ?></a></li>
                        </ul>
                    </li>
                <?php endif; ?>
            </ul><!--/.nav -->
        </div><!--/.nav-collapse -->

        <div id="pagination" class="nav-collapse collapse">
            <ul class="nav navbar-nav">

            </ul>
        </div><!--/pagination -->

        <div class="clear"></div>
        
    </div>
</div>