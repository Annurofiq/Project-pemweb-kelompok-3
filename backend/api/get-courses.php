<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

require '../config/database.php';

// Ambil ID dari parameter URL
$id = $_GET['id'] ?? null;

if (!$id) {
    http_response_code(400); // Bad Request
    echo json_encode(["message" => "ID tidak ditemukan"]);
    exit;
}

// Query 1 course by id
$stmt = $conn->prepare("SELECT * FROM courses WHERE id = ?");
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($course = $result->fetch_assoc()) {
    echo json_encode($course);
} else {
    http_response_code(404);
    echo json_encode(["message" => "Kelas tidak ditemukan"]);
}
