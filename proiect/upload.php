<?php
$targetDir = "uploads/";
$targetFilePath = $targetDir . "uploaded_photo.jpg";

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_FILES['photo'])) {
    if (!is_dir($targetDir)) {
        mkdir($targetDir, 0777, true);
    }

    if (move_uploaded_file($_FILES["photo"]["tmp_name"], $targetFilePath)) {
        echo json_encode(['success' => true, 'filePath' => $targetFilePath]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to upload photo.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'No photo provided or invalid request.']);
}
?>
