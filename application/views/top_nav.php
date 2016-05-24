<div class="navbar navbar-dark bg-inverse navbar-full navbar-fixed-top">

        <button class="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#exCollapsingNavbar2">
        &#9776;
        </button>

        <div class="collapse navbar-toggleable-xs" id="exCollapsingNavbar2">
            <a class="navbar-brand" href="<?= URL::base(); ?>"><?= $title ?></a>

            <ul class="nav navbar-nav">
              <?=$nav_list?>
            </ul><!--/.nav -->

            <ul class="nav navbar-nav pull-xs-right">
                <li id="save_nav" class="nav-item"><a class="nav-link" id="save" href="#"><?= __('Save') ?></a></li>
                <li id="save_nav" class="nav-item"><a class="nav-link" id="load" href="#"><?= __('Load') ?></a></li>
                <?php if ($show_login): ?>
                    <li id="log_in" class="nav-item"><a class="nav-link" href="#"><?= __('Log In') ?></a></li>
                <?php else: ?>
                    <li id="settings" class="dropdown nav-item" title="<?= __('Settings') ?>">
                        <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown">
                            <span class="glyphicon glyphicon-th-list"></span>
                            <b class="caret"></b>
                        </a>
                        <div class="dropdown-menu pull-right" aria-labelledby="settings">
                            <a class="dropdown-item" href="/settings"><?= __('Settings') ?></a>
                            <h6 class="dropdown-header dropdown-item"><?= __('Administration') ?></h6>
                            <?=$admin_nav?>
                            <div class="dropdown-divider"></div>
                            <a class="dropdown-item" href="/user/logout"><?= __('Log Out') ?></a>
                        </div>
                    </li>
                <?php endif; ?>
            </ul>
        </div>

        <div id="pagination" class="nav-collapse collapse">
            <ul class="nav navbar-nav">

            </ul>
        </div><!--/pagination -->

        <div class="clear"></div>
        
    <!-- </div> -->
</div>