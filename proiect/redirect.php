<?php

session_start(); 

if (isset($_COOKIE['state'])) {
    $_SESSION['state'] = $_COOKIE['state'];
} else {
    die('State not found in session or cookie.');
}

$clientId = '38-e6V-J8gTBFVVVVwAfsA';
$clientSecret = '7JVHQf_-OMSyn3DixACjz1WR8EeTeg';
$redirectUri = 'https://localhost/final/redirect.php'; 

if (isset($_GET['code']) && isset($_GET['state'])) {
    $code = $_GET['code'];
    $state = $_GET['state'];

    if (!isset($_SESSION['state']) || $state !== $_SESSION['state']) {
        die('Invalid state parameter.');
    }

    $tokenUrl = 'https://www.reddit.com/api/v1/access_token';
    $postData = array(
        'grant_type' => 'authorization_code',
        'code' => $code,
        'redirect_uri' => $redirectUri
    );

    $auth = base64_encode("$clientId:$clientSecret");

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $tokenUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/x-www-form-urlencoded',
        'Authorization: Basic ' . $auth,
        'User-Agent: M-PIC/1.0.0 (https://localhost/final/index.php)'
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
        die('Error fetching access token: ' . $tokenData->error);
    }

   

    echo "<script>";
    echo "localStorage.setItem('reddit_access_token', '" . $tokenData->access_token . "');";
    echo "sessionStorage.setItem('token_received', 'true');"; 
    echo "window.location.href = 'index.php';";
    echo "</script>";
    exit();
} else {
    die('Missing code or state parameters.');
}
    
?>
