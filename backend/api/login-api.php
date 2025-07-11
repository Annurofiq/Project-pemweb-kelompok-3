<?php
// ===== Header CORS =====
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

// ===== Tangani preflight dari browser =====
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

session_start();
require '../config/database.php';
header("Content-Type: application/json");

// ===== Validasi request method =====
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["message" => "Method tidak diizinkan"]);
    exit;
}

// ===== Ambil data dari body =====
$data = json_decode(file_get_contents("php://input"), true);
$email = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');

// ===== Validasi kosong =====
if (!$email || !$password) {
    http_response_code(400);
    echo json_encode(["message" => "Email dan password wajib diisi"]);
    exit;
}

// ===== Cek user dari database =====
$stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if ($user && password_verify($password, $user['password'])) {
    $_SESSION['user'] = [
        'id' => $user['id'],
        'name' => $user['name'],
        'email' => $user['email'],
        'role' => $user['role']
    ];

    echo json_encode([
        "message" => "Login berhasil",
        "user" => $_SESSION['user']
    ]);
} else {
    http_response_code(401);
    echo json_encode(["message" => "Email atau password salah"]);
}
