<div class="navbar navbar-dark bg-inverse navbar-full navbar-fixed-top">
    <!-- <div class="container-fluid"> -->
        
        <!-- <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="<?= URL::base(); ?>"><?= $title ?></a>
        </div> -->

        <button class="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#exCollapsingNavbar2">
        &#9776;
        </button>

        <div class="collapse navbar-toggleable-xs" id="exCollapsingNavbar2">
            <a class="navbar-brand" href="<?= URL::base(); ?>"><?= $title ?></a>
            <ul class="nav navbar-nav pull-right">
                <li id="save_nav" class="nav-item"><a class="nav-link" id="save" href="#"><?= __('Save') ?></a></li>
                <li id="save_nav" class="nav-item"><a class="nav-link" id="load" href="#"><?= __('Load') ?></a></li>
                <?php //if ($show_login): ?>
                    <li id="log_in" class="nav-item"><a class="nav-link" href="#"><?= __('Log In') ?></a></li>
                <?php// else: ?>
                    <li id="settings" class="dropdown nav-item" title="<?= __('Settings') ?>">
                        <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown">
                            <span class="glyphicon glyphicon-th-list"></span>
                            <b class="caret"></b>
                        </a>
                        <ul class="dropdown-menu pull-right" aria-labelledby="settings">
                            <li class="dropdown-item"><a href="/settings"><?= __('Settings') ?></a></li>
                            <li class="dropdown-header dropdown-item"><?= __('Administration') ?></li>
                            <?=$admin_nav?>
                            <li class="divider"></li>
                            <li class="dropdown-item"><a href="/user/logout"><?= __('Log Out') ?></a></li>
                        </ul>
                    </li>
                <?php //endif; ?>
            </ul>
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
        
    <!-- </div> -->
</div>