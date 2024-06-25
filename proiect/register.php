
<?php
session_start();

header('Content-Type: application/json');

$dbhost = 'localhost';
$dbname = 'mpic_db';
$dbuser = 'root';
$dbpass = '';

$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
if ($conn->connect_error) {
    echo json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]);
    exit();
}

$errors = [];

// Imgur API Client ID
$imgurClientId = '4db27f46050490a';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING);
    $password = filter_input(INPUT_POST, 'password1', FILTER_SANITIZE_STRING);
    $confirmPassword = filter_input(INPUT_POST, 'password2', FILTER_SANITIZE_STRING);

    if (empty($username) || empty($password) || empty($confirmPassword)) {
        $errors[] = "Username and both passwords are required.";
    }
    if ($password !== $confirmPassword) {
        $errors[] = "Passwords do not match.";
    }
    $profileImage = null;
    if (isset($_FILES['profileImage']) && $_FILES['profileImage']['error'] === UPLOAD_ERR_OK) {
        $tempFile = $_FILES["profileImage"]["tmp_name"];
        $originalFileName = basename($_FILES["profileImage"]["name"]);
        $fileExtension = strtolower(pathinfo($originalFileName, PATHINFO_EXTENSION));

        $allowedTypes = ['png', 'jpeg', 'jpg', 'gif', 'svg'];
        if (!in_array($fileExtension, $allowedTypes)) {
            $errors[] = "Only PNG, JPEG, GIF, and SVG files are allowed.";
        } else {
            // Upload to Imgur
            $imageData = file_get_contents($tempFile);
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

            $responseData = json_decode($response, true);
            if ($httpCode == 200 && $responseData['success']) {
                $profileImage = $responseData['data']['link'];
            } else {
                $errors[] = "Error uploading the image to Imgur: " . $responseData['data']['error'];
            }
        }
    }

    if (empty($errors)) {
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        $checkStmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
        $checkStmt->bind_param("s", $username);
        $checkStmt->execute();
        $result = $checkStmt->get_result();

        if ($result->num_rows > 0) {
            echo json_encode(["success" => false, "message" => "Username already exists! Please choose another."]);
        } else {
            $stmt = $conn->prepare("INSERT INTO users (username, password, profile_image) VALUES (?, ?, ?)");
            $stmt->bind_param("sss", $username, $hashedPassword, $profileImage);

            if ($stmt->execute()) {
                $_SESSION['registration_success'] = true;
                echo json_encode(["success" => true, "message" => "Successfully registered!"]);
            } else {
                echo json_encode(["success" => false, "message" => "Error registering user. Please try again."]);
            }

            $stmt->close();
        }

        $checkStmt->close();
    } else {
        echo json_encode(["success" => false, "message" => implode(" ", $errors)]);
    }
}

$conn->close();
?>
