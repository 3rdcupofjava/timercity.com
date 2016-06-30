<div id="nav_save" class="subnav container-fluid" style="display:none;">

    <form class="navbar-form form-inline pull-xs-right" style="padding-top:10px; padding-bottom: 5px;">
        <label for="storage_key_save"><?= __('Save under') ?>:</label>
        <input id="storage_key_save" class="form-control" name="storage_key_save" type="text" placeholder="<?= __('Make it good for global.') ?>">
        <button id="save_local" type="button" class="btn btn-primary">
            <?= __('Local') ?>
        </button>
        <button id="save_global" type="button" class="btn btn-primary">
            <?= __('Global') ?>
        </button>
    </form>
    <div class="clear"></div>

</div>

<div id="nav_load" class="subnav container-fluid" style="display:none;">

    <form class="navbar-form pull-xs-right form-inline" style="padding-top:10px; padding-bottom: 5px;">
        <label for="storage_key_load"><?= __('Load from') ?>:</label>
        <input id="storage_key_load" class="form-control" name="storage_key_load" type="text" placeholder="<?= __('Make it good for global.') ?>">
        <button id="load_local" type="button" class="btn btn-primary">
            <?= __('Local') ?>
        </button>
        <button id="load_global" type="button" class="btn btn-primary">
            <?= __('Global') ?>
        </button>
    </form>
    <div class="clear"></div>

</div>

<div id="nav_login" class="subnav container-fluid" style="display:none;">

        <form id="registration_form" action="/yaam/public/login" method="POST" class="navbar-form form-inline pull-xs-right" style="padding-top:10px; padding-bottom: 5px;">
            <input id="username" class="form-control" name="username" type="text" placeholder="<?= __('Email') ?>">
            <input id="password" class="form-control" name="password" type="password" placeholder="<?= __('Password') ?>">
            <input id="why" name="why" style="display:none; width:400px;" type="text" placeholder="Briefly describe why you are interested in early access.">

            <div id="button_log_in" class="btn-group">
                <button type="submit" class="btn btn-primary">
                    <?= __('Log In') ?>
                </button>
                <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                    <span class="caret"></span>
                </button>

                <div class="dropdown-menu pull-xs-right">
                    <a class="dropdown-item">
                        <div class="checkbox" style="padding-left:18px;">
                            <label>
                                <input id="remember" name="remember" type="checkbox"> <?= __('Remember me') ?>
                            </label>
                        </div>
                    </a>
                    <a class="dropdown-item" href="/user/forgot"><?= __('Forgot my password') ?></a>
                </div>
            </div>
            <button id="button_register" type="submit" class="btn btn-primary">
                <?= __('Register') ?>
            </button>
            <button id="button_request" type="submit" class="btn btn-primary">
                <?= __('Request') ?>
            </button>
        </form>
        <div class="clear"></div>

</div>