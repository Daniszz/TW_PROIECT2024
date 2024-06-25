<?php
header('Content-Type: application/json');

$server = 'localhost';
$username = 'root';
$password = '';
$database = 'mpic_db';

$conn = new mysqli($server, $username, $password, $database);

if ($conn->connect_error) {
    $response = ['error' => true, 'message' => "Connection failed: " . $conn->connect_error];
    echo json_encode($response);
    exit(); 
}

$sql = "SELECT username FROM users";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    $response = ['error' => true, 'message' => "Query preparation failed: " . $conn->error];
    echo json_encode($response);
    exit();
}

if (!$stmt->execute()) {
    $response = ['error' => true, 'message' => "Query execution failed: " . $stmt->error];
    echo json_encode($response);
    exit();
}

$result = $stmt->get_result();

if ($result === false) {
    $response = ['error' => true, 'message' => "Fetching result set failed: " . $stmt->error];
    echo json_encode($response);
    exit();
}

$users = [];
while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

$result->close();
$stmt->close();

$response = ['error' => false, 'users' => $users];
echo json_encode($response);

$conn->close();
?>
