<?php
$imgurClientId = '4db27f46050490a';

function uploadImageToImgur($imagePath, $imgurClientId) {
    $imageData = file_get_contents($imagePath);
    $base64Image = base64_encode($imageData);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://api.imgur.com/3/image');
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Client-ID ' . $imgurClientId
    ]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, [
        'image' => $base64Image,
        'type' => 'base64'
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode === 200) {
        $responseData = json_decode($response, true);
        return $responseData['data']['link'];
    } else {
        return false;
    }
}function postToReddit($title, $description, $imgurUrl, $accessToken) {
    $username = getRedditUsername($accessToken);
    if (!$username) {
        return "Error: Could not retrieve Reddit username.";
    }

    $url = 'https://oauth.reddit.com/api/submit';
    
    $postData = http_build_query([
        'title' => $description,
        'url' => $imgurUrl, 
        'kind' => 'link',
        'api_type' => 'json',
        'sendreplies' => true,
        'sr' => 'u_' . $username 
    ]);

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        "Authorization: Bearer $accessToken",
        "Content-Type: application/x-www-form-urlencoded",
        "User-Agent: M-PIC/1.0"
    ));
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode != 200) {
        $errorData = json_decode($response, true);
        $errorMessage = isset($errorData['json']['errors'][0]) ? $errorData['json']['errors'][0][1] : "An unknown error occurred.";

        if ($httpCode == 429) {
            $errorMessage = "Rate limit exceeded. Please try again later.";
        }

        return "Error ($httpCode): " . $errorMessage;
    } else {
        return $response;
    }
}

function getRedditUsername($accessToken) {
    $url = 'https://oauth.reddit.com/api/v1/me';

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        "Authorization: Bearer $accessToken",
        "User-Agent: M-PIC/1.0"
    ));

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode == 200) {
        $userData = json_decode($response, true);
        if (json_last_error() == JSON_ERROR_NONE && isset($userData['name'])) {
            return $userData['name'];
        } else {
            error_log("Error parsing Reddit response: " . $response);
            return null; 
        }
    } else {
        error_log("Reddit API request failed with code $httpCode: " . $response); 
        return null;
    }
}


function uploadImageToUnsplash($imageFilePath, $description, $userAccessToken) {
    $uploadUrl = 'https://api.unsplash.com/photos';
    echo $userAccessToken;
    $headers = [
        'Authorization: Bearer ' . $userAccessToken,
        'Content-Type: multipart/form-data'
    ];

    $postData = [
        'photo' => new CURLFile($imageFilePath), 
        'description' => $description 
    ];

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $uploadUrl);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        $error_msg = curl_error($ch);
        curl_close($ch);
        return "Error: " . $error_msg;
    }

    curl_close($ch);

    return $response;
}


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    echo '<pre>';
    print_r($_POST);
    print_r($_FILES);
    echo '</pre>';
    $redditAccessToken = $_POST['redditAccessToken'];
    $unsplashAccessToken = $_POST['unsplashAccessToken'];
    $source = $_POST['postTitle'];
    $description = $_POST['postDescription'];
    $image = $_FILES['postImage'];

    $uploadsDirectory = 'uploads/';
    if (!is_dir($uploadsDirectory)) {
        mkdir($uploadsDirectory, 0777, true);
    }

    $tempFile = $image['tmp_name'];
    $imagePath = $uploadsDirectory . basename($image['name']);
    if (move_uploaded_file($tempFile, $imagePath)) {
        $imgurUrl = uploadImageToImgur($imagePath, $imgurClientId);

        if ($imgurUrl) {
            if ($source === 'reddit') {
                $response = postToReddit('Post Title', $description, $imgurUrl, $redditAccessToken);
                echo 'Posted to Reddit: ' . $response;
                echo "<script>";
                echo "window.location.href = 'index.php';";
                echo "</script>";
            } else {
                echo 'Invalid source selected.';
            }
        } else {
            echo 'Error uploading image to Imgur.';
        }
    } else {
        echo 'Error uploading file.';
    }
} else {
    echo 'Invalid request method.';
}
?>


