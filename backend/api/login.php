<?php
session_start();
require '../config/database.php';
header("Content-Type: text/html; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    if (!$email || !$password) {
        echo "<p style='color:red'>Email dan password wajib diisi.</p>";
    } else {
        $result = $conn->query("SELECT * FROM users WHERE email='$email'");
        $user = $result->fetch_assoc();

        if ($user && password_verify($password, $user['password'])) {
            // Simpan data user ke session
            $_SESSION['user'] = [
                'id' => $user['id'],
                'name' => $user['name'],
                'email' => $user['email'],
                'role' => $user['role']
            ];
            // Redirect ke halaman setelah login
            header("Location: profile.php");
            exit;
        } else {
            echo "<p style='color:red'>Email atau password salah.</p>";
        }
    }
}
?>

<!-- HTML Form Login -->
<!DOCTYPE html>
<html>
<head>
  <title>Login</title>
</head>
<body>
  <h2>Form Login</h2>
  <form method="POST" action="">
    <label>Email:</label><br>
    <input type="email" name="email" required><br><br>

    <label>Password:</label><br>
    <input type="password" name="password" required><br><br>

    <button type="submit">Login</button>
  </form>
  <br>
  <a href="../index.php">🔙 Kembali</a> |
  <a href="register.php">Daftar Akun Baru</a>
</body>
</html>