<?php

$conn = mysqli_connect("localhost", "root", "", "mpic_posts");

if($conn) {
    
}
else {
    echo'Connection error: ' . mysqli_connect_error();
}

if(isset($_POST['submitPost'])) {
    $title = $_POST['postTitle'];
    $description = $_POST['postDescription'];
    $file = $_FILES['postImage'];
    
    $fileName = $_FILES['postImage']['name'];
    $fileTmpName = $_FILES['postImage']['tmp_name'];
    $fileSize = $_FILES['postImage']['size'];
    $fileError = $_FILES['postImage']['error'];
    $fileType = $_FILES['postImage']['type'];

    $fileExt = explode('.', $fileName);
    $fileActualExt = strtolower(end($fileExt));

    if($fileError === 0) {
        if($fileSize < 512000) { //less than 512kb
            $fileNameNew = uniqid('', true).".".$fileActualExt;
            $fileDestination = 'uploads/'.$fileNameNew;
            move_uploaded_file($fileTmpName, $fileDestination);


            header("Location: index.php?uploadsuccess");
        }
        else {
            echo "Error, image too big!";
        }
    }
    else {
        echo "Error while uploading the file!";
    }
}
?>