<?php require_once ('./PHP-MySQLi-Database-Class/MysqliDb.php');  // lib_url: https://github.com/31H0B1eV/PHP-MySQLi-Database-Class

function get_data()
{
    $db = new MysqliDb ('localhost', 'homestead', 'secret', 'timercity.com');

    $cols = Array ("title", "time", "email");
    try {
        $alarms = $db->get ("alarms", null, $cols);
        return $alarms;
    } catch (Exception $e) {
        return $e->getMessage();
    }
}

function set_data($title, $time, $email)
{
    $db = new MysqliDb ('localhost', 'homestead', 'secret', 'timercity.com');

    $data = Array ('title' => $title,
                   'time' => $time,
                   'email' => $email
    );
    try {
        $id = $db->insert('alarms', $data);

        if($id)
            echo 'alarm was added. Id='.$id;
    } catch(Exception $e) {
        echo $e->getMessage();
    }
}