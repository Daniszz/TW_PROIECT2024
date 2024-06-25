<?php

session_start();
if (!isset($_GET['code'])) {
  die('Authorization code not provided.');
}

if (isset($_COOKIE['unsplash_state'])) {
    $_SESSION['state'] = $_COOKIE['unsplash_state'];
} else {
    die('State not found in session or cookie.');
}


$clientIdUS = '6qZ48mGQ4W-NW9ml2KhSGyt50aOo3ku1KSrc_rwfdeQ';
$clientSecretUS = '7N9LzSAIGTBMPcUuDpHs8o6sW7-D1MuRAuQ2h4-YJyY';
$redirectUriUS = 'https://localhost/final/redirectT.php';

if (isset($_GET['code']) && isset($_GET['state'])) {
    $code = $_GET['code'];
    $state = $_GET['state'];

    if (!isset($_SESSION['state']) || $state !== $_SESSION['state']) {
        die('Invalid state parameter.');
    }

    $tokenUrl = 'https://unsplash.com/oauth/token';
    $postData = array(
        'client_id' => $clientIdUS,
        'client_secret' => $clientSecretUS,
        'redirect_uri' => $redirectUriUS,
        'code' => $code,
        'grant_type' => 'authorization_code'
    );

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $tokenUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/x-www-form-urlencoded',
        'User-Agent: M-PIC/1.0.0 (https://localhost/final/index)'
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
        die('Error fetching access token: ' . $tokenData->error_description);
    }

    echo "<script>";
    echo "localStorage.setItem('unsplash_access_token', '" . $tokenData->access_token . "');";
    echo "sessionStorage.setItem('token_received_unsplash', 'true');";
    echo "window.location.href = 'index.php';";
    echo "</script>";
    exit();
} else {
    die('Missing code or state parameters.');
}
?>
