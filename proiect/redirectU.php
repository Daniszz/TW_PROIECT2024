<?php

session_start();
if (!isset($_GET['code'])) {
  die('Authorization code not provided.');
}

if (isset($_COOKIE['fb_state'])) {
    $_SESSION['state'] = $_COOKIE['fb_state'];
} else {
    die('State not found in session or cookie.');
}

$clientIdFB = '1622215675224216';
$clientSecretFB = '31bebc936a1fa230dcfcd35cf19de341';
$redirectUriFB = 'https://localhost/final/redirectU.php'; 

if (isset($_GET['code']) && isset($_GET['state'])) {
    $code = $_GET['code'];
    $state = $_GET['state'];

    if (!isset($_SESSION['state']) || $state !== $_SESSION['state']) {
        die('Invalid state parameter.');
    }

    $tokenUrl = 'https://graph.facebook.com/v12.0/oauth/access_token';
    $postData = array(
        'client_id' => $clientIdFB,
        'redirect_uri' => $redirectUriFB,
        'client_secret' => $clientSecretFB,
        'code' => $code
    );

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $tokenUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/x-www-form-urlencoded',
        'User-Agent: YourAppName/1.0.0 (https://localhost/your_app_homepage)'
    ));
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($postData));

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    if ($response === false || $httpCode !== 200) {
        die('Failed to fetch access token: ' . curl_error($ch) . ' (HTTP code ' . $httpCode . ')');
    }

    curl_close($ch);

    $tokenData = json_decode($response);
    if (json_last_error() !== JSON_ERROR_NONE) {
        die('Failed to decode JSON response: ' . json_last_error_msg());
    }

    if (isset($tokenData->error)) {
        die('Error fetching access token: ' . $tokenData->error->message);
    }

    echo "<script>";
    echo "localStorage.setItem('facebook_access_token', '" . $tokenData->access_token . "');";
    echo "sessionStorage.setItem('token_received_fb', 'true');";
    echo "window.location.href = 'index.php';";
    echo "</script>";
    exit();
} else {
    die('Missing code or state parameters.');
}
?>
