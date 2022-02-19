<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");

// include classes
foreach (glob('classes/*.php') as $file) {
    require_once $file;
}

$db = new basicdb('localhost', 'react-auth', 'root', 'mysql');
$url = Helpers::getUrl();

if ($_POST) {
    switch ($url):
        case 'login':
            $username = Helpers::post('username');
            $password = Helpers::post('password');

            if (!$username || !$password) {
                echo Helpers::createResult('error', 'Please check fields');
            } else {
                $row = $db->from('users')->where('username', $username)->first();

                if ($row) {

                    if (password_verify($password, $row['password'])) {
                        echo Helpers::createResult('success', 'Login successful, you are redirected!', [
                            'username' => $username,
                            'token' => Auth::encode($row['id'])
                        ]);

                    }else{
                        echo Helpers::createResult('error','Username and password do not match!');
                    }

                } else {
                    echo Helpers::createResult('error', 'Username not found in the system!');
                }

            }

            break;
        case 'register':
            $username = Helpers::post('username');
            $password = Helpers::post('password');

            if (!$username || !$password) {
                echo Helpers::createResult('error', 'Please check fields');
            } else {
                $row = $db->from('users')->where('username', $username)->first();

                if (!$row) {
                    $db->insert('users')->set([
                        'username' => $username,
                        'password' => password_hash($password, PASSWORD_DEFAULT)
                    ]);

                    echo Helpers::createResult('success', 'Register successful, you are redirected!');

                } else {
                    echo Helpers::createResult('error', 'This username is registered!');
                }
            }

            break;

        case 'token':
            $token = Helpers::post('token');
            $id = Auth::decode($token);
            $row = $db->from('users')->where('id',$id)->first();

            if (!$token || !$id || !$row) {
                echo json_encode([]);
            }else {
                echo json_encode([
                    'data' => [
                        'token' => $token,
                        'username' => $row['username']
                    ]
                ]);
            }


            break;
    endswitch;

}
