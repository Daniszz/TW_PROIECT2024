<?php
header('Content-Type: application/json');
session_start();
$server = 'localhost';
$username = 'root';
$password = '';
$database = 'mpic_db';

$conn = new mysqli($server, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$username = basename($_SERVER['REQUEST_URI']);

$stmt = $conn->prepare("DELETE FROM users WHERE username = ?");
$stmt->bind_param("s", $username);

if ($stmt->execute()) {
    echo json_encode(["message" => "User deleted successfully"]);
} else {
    http_response_code(400);
    echo json_encode(["message" => "Failed to delete user"]);
}

$stmt->close();
$conn->close();
?>