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

$data = json_decode(file_get_contents('php://input'), true);

if (isset($_SESSION['username'])) {
    $username = $_SESSION['username'];
} else {
    echo "Username not set in session.";
    exit;
}

$username = $_SESSION['username'];

foreach ($data as $photo) {
    $id = $photo['id'];
    $title = $conn->real_escape_string($photo['title']); 
    $link = $photo['link'];
    $likes = $photo['likes'];
    $downloaded = $photo['downloaded'];
    $created_at = $photo['created_at'];
    $image = $photo['image'];
    $author = $photo['author'];

    $sql = "INSERT INTO unsplash_photos (id, title, link, likes, downloaded, created_at, image, author,username)
            VALUES ('$id', '$title', '$link', '$likes', '$downloaded', '$created_at', '$image', '$author','$username')";

    if ($conn->query($sql) !== TRUE) {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
