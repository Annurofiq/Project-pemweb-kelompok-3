<?php
session_start();
require '../config/database.php';

// Pastikan user login
if (!isset($_SESSION['user'])) {
    header("Location: login.php");
    exit;
}

$user_id = $_SESSION['user']['id'];

// Hapus dulu enrollments-nya
$conn->query("DELETE FROM enrollments WHERE user_id = $user_id");

// Hapus user
$conn->query("DELETE FROM users WHERE id = $user_id");

// Hapus session
session_destroy();

// Redirect ke halaman utama
header("Location: ../index.php");
exit;
