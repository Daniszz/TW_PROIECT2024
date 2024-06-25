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

foreach ($data as $post) {
  $id = $post['id'];
  $permalink = $post['permalink'];
  $score = isset($post['score']) ? $post['score'] : 0;
  $num_comments = isset($post['num_comments']) ? $post['num_comments'] : 0;
  $title = isset($post['title']) ? $post['title'] : '';
  $description = isset($post['description']) ? $post['description'] : '';
  $num_shares = isset($post['num_shares']) ? $post['num_shares'] : 0;
  $subreddit = isset($post['subreddit']) ? $post['subreddit'] : '';
  $author = isset($post['author']) ? $post['author'] : '';
  $created_utc = isset($post['created_utc']) ? $post['created_utc'] : '';
  $image = isset($post['image']) ? $post['image'] : '';

  $sql = "INSERT INTO reddit_posts (id, permalink, username, score, num_comments, title, description, num_shares, subreddit, author, created_utc, image, source) 
          VALUES ('$id', '$permalink', '$username', '$score', '$num_comments', '$title', '$description', '$num_shares', '$subreddit', '$author', '$created_utc', '$image', 'reddit')";

  if ($conn->query($sql) !== TRUE) {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }
}

$conn->close();
?>
