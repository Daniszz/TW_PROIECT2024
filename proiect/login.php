<?php
session_start();

$dbhost = 'localhost';
$dbname = 'mpic_db';
$dbuser = 'root';
$dbpass = '';

$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

if (isset($_GET['logout'])) {
    session_unset();
    session_destroy();
    header("Location: login.html");
    exit;
}

$username = $_POST['username'] ?? null;
$password = $_POST['password'] ?? null;

$response = ["success" => false, "message" => ""];

if ($username && $password) {
    $stmt = $conn->prepare("SELECT id, password FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        $storedPassword = $row['password'];

        if (password_verify($password, $storedPassword)) {
            $_SESSION['userid'] = $row['id'];
            $_SESSION['username'] = $username;
            $response["success"] = true;
            $response["message"] = "Login successful!";
        } else {
            $response["message"] = "Invalid password.";
        }
    } else {
        $response["message"] = "User not found.";
    }

    $stmt->close();
} else {
    $response["message"] = "Please enter both username and password.";
}

$conn->close();
echo json_encode($response);
?>
