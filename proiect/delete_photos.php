
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

if(isset($_SESSION['username'])) {
    $username = $_SESSION['username'];
} else {
    echo "Username not set in session.";
    exit;
}

$sql = "DELETE FROM photos WHERE username = '$username' AND source = 'facebook'";

if ($conn->query($sql) === TRUE) {
  echo "Photos deleted successfully";
} else {
  echo "Error deleting photos: " . $conn->error;
}

$conn->close();
?>
