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

// ===== Start session untuk akses $_SESSION['user'] =====
session_start();
require '../config/database.php';
header("Content-Type: application/json");

// ===== Validasi method =====
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["message" => "Method tidak diizinkan"]);
    exit;
}

// ===== Cek apakah user sudah login =====
if (!isset($_SESSION['user'])) {
    http_response_code(401);
    echo json_encode(["message" => "Silakan login terlebih dahulu"]);
    exit;
}

// ===== Ambil ID user dari session =====
$user_id = $_SESSION['user']['id'];

// ===== Ambil course_id dari body JSON =====
$input = json_decode(file_get_contents("php://input"), true);
$course_id = intval($input['course_id'] ?? 0);

if (!$course_id) {
    http_response_code(400);
    echo json_encode(["message" => "ID kelas tidak valid"]);
    exit;
}

// ===== Cek apakah user sudah pernah daftar kelas ini =====
$check = $conn->prepare("SELECT * FROM enrollments WHERE user_id = ? AND course_id = ?");
$check->bind_param("ii", $user_id, $course_id);
$check->execute();
$res = $check->get_result();

if ($res->num_rows > 0) {
    echo json_encode(["message" => "Kamu sudah mendaftar kelas ini"]);
    exit;
}

// ===== Simpan ke tabel enrollments =====
$stmt = $conn->prepare("INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)");
$stmt->bind_param("ii", $user_id, $course_id);

if ($stmt->execute()) {
    echo json_encode(["message" => "Berhasil daftar kelas!"]);
} else {
    http_response_code(500);
    echo json_encode(["message" => "Gagal daftar kelas"]);
}
