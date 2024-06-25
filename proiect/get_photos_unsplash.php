<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "mpic_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id, title, link, likes, downloaded, created_at, image, author,username FROM unsplash_photos ";
$result = $conn->query($sql);

$data = array();

if ($result->num_rows > 0) {
    // Fetch data and add to array
    while($row = $result->fetch_assoc()) {
        if ($row['username'] == $_SESSION['username']) {  
            $data[] = $row;
        }
    }
}

$conn->close();

header('Content-Type: application/json');

// Output the data as JSON
echo json_encode($data);
?>
