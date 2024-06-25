<?php
session_start();

header('Content-Type: application/json');

$dbhost = 'localhost';
$dbname = 'mpic_db';
$dbuser = 'root';
$dbpass = '';

$conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

$response = ["success" => false, "message" => "", "data" => null];

if (isset($_SESSION['userid'])) {
    $userid = $_SESSION['userid'];

    $stmt = $conn->prepare("SELECT username, profile_image FROM users WHERE id = ?");
    $stmt->bind_param("i", $userid);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()) {
        $response["success"] = true;
        $response["data"] = [
            "username" => $row["username"],
            "profile_image" => $row["profile_image"]
        ];
    } else {
        $response["message"] = "User not found.";
    }

    $stmt->close();
} else {
    $response["message"] = "User not logged in.";
}

$conn->close();

echo json_encode($response);
?>
