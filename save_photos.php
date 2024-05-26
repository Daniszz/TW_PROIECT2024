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

if(isset($_SESSION['username'])) {
    $username = $_SESSION['username'];
} else {
    echo "Username not set in session.";
    exit;
}

foreach ($data as $photo) {
  $id = $photo['id'];
  $link = $photo['link'];
  $likes = isset($photo['likes']) ? $photo['likes'] : 0;
  $comments = isset($photo['comments']) ? $photo['comments'] : 0;
  $name = isset($photo['name']) ? $photo['name'] : '';
  $description = isset($photo['description']) ? $photo['description'] : '';

  $sql = "INSERT INTO photos (id, link, username, likes, comments, name, description, source) VALUES ('$id', '$link', '$username', '$likes', '$comments', '$name', '$description', 'facebook')";

  if ($conn->query($sql) !== TRUE) {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
}

$conn->close();
?>
