<div id="nav_login" class="container-fluid">

        <form id="registration_form" action="/yaam/public/login" method="POST" style="display:none; padding-right:0px;" class="navbar-form pull-right">
            <input id="username" name="username" type="text" placeholder="<?= __('Email') ?>">
            <input id="password" name="password" type="password" placeholder="<?= __('Password') ?>">
            <input id="why" name="why" style="display:none; width:400px;" type="text" placeholder="Briefly describe why you are interested in early access.">

            <div id="button_log_in" class="btn-group">
                <button type="submit" class="btn btn-primary">
                    <?= __('Log In') ?>
                </button>
                <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                    <span class="caret"></span>
                </button>

                <ul class="dropdown-menu pull-right">
                    <li>
                        <div class="checkbox" style="padding-left:18px;">
                            <label>
                                <input id="remember" name="remember" type="checkbox"> <?= __('Remember me') ?>
                            </label>
                        </div>
                    </li>
                    <li>
                        <a href="/user/forgot"><?= __('Forgot my password') ?></a>
                    </li>
                </ul>
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