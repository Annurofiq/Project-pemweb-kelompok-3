<?php
// Izinkan akses dari frontend
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require '../config/database.php';

$sql = "SELECT id, name, email FROM users"; // Jangan tampilkan password
$result = $conn->query($sql);

$users = [];

while ($row = $result->fetch_assoc()) {
    $users[] = $row;
}

echo json_encode($users);
