<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postData = json_decode(file_get_contents('php://input'), true);

    if (isset($postData['image'])) {
        $imagePath = 'uploads/modified_photo.jpg'; 

        $imageData = str_replace('data:image/jpeg;base64,', '', $postData['image']);
        $imageData = str_replace(' ', '+', $imageData);
        $imageData = base64_decode($imageData);

        if (file_put_contents($imagePath, $imageData)) {
            echo json_encode(['success' => true, 'imagePath' => $imagePath]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Failed to save image.']);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'No image data received.']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method.']);
}
?>
