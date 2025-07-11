<?php
// ===== Header CORS =====
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ===== Koneksi ke database =====
require '../config/database.php';
header("Content-Type: application/json");

// ===== Validasi metode =====
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["message" => "Metode tidak diizinkan"]);
    exit;
}

// ===== Ambil data JSON dari body =====
$data = json_decode(file_get_contents("php://input"), true);

// ===== Ambil field dan trim =====
$name     = trim($data['name'] ?? '');
$email    = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');
$role     = trim($data['role'] ?? 'user');

// ===== Validasi =====
if (!$name || !$email || !$password || !$role) {
    http_response_code(400);
    echo json_encode(["message" => "Semua field harus diisi"]);
    exit;
}

// ===== Cek email sudah terdaftar =====
$stmt = $conn->prepare("SELECT id FROM users WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$stmt->store_result();
if ($stmt->num_rows > 0) {
    http_response_code(409);
    echo json_encode(["message" => "Email sudah terdaftar"]);
    exit;
}
$stmt->close();

// ===== Hash password =====
$passwordHashed = password_hash($password, PASSWORD_BCRYPT);

// ===== Simpan ke database =====
$stmt = $conn->prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $name, $email, $passwordHashed, $role);

if ($stmt->execute()) {
    echo json_encode(["message" => "✅ Registrasi berhasil"]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "❌ Gagal mendaftar: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
