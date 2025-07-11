<?php
session_start();
require '../config/database.php';
header("Content-Type: text/html; charset=UTF-8");

// Cek login
if (!isset($_SESSION['user'])) {
    header("Location: login.php");
    exit;
}

$user_id = $_SESSION['user']['id'];
$message = "";

// Update user jika ada POST
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update'])) {
    $name = $conn->real_escape_string($_POST['name']);
    $email = $conn->real_escape_string($_POST['email']);
    $role = $_POST['role'];
    $password = $_POST['password'];

    if ($password !== '') {
        $hashed = password_hash($password, PASSWORD_DEFAULT);
        $sql = "UPDATE users SET name='$name', email='$email', role='$role', password='$hashed' WHERE id=$user_id";
    } else {
        $sql = "UPDATE users SET name='$name', email='$email', role='$role' WHERE id=$user_id";
    }

    if ($conn->query($sql)) {
        $message = "<p style='color:green;'>✅ Profil berhasil diperbarui</p>";
        // Update session
        $_SESSION['user']['name'] = $name;
        $_SESSION['user']['email'] = $email;
        $_SESSION['user']['role'] = $role;
    } else {
        $message = "<p style='color:red;'>❌ Gagal update: " . $conn->error . "</p>";
    }
}

// Ambil ulang data user
$result = $conn->query("SELECT * FROM users WHERE id=$user_id");
$user = $result->fetch_assoc();
?>

<!DOCTYPE html>
<html>
<head>
  <title>Profil Saya</title>
</head>
<body>
  <h2>Profil Pengguna</h2>
  <?= $message ?>

  <form method="POST" action="">
    <label>Nama:</label><br>
    <input type="text" name="name" required value="<?= $user['name'] ?>"><br><br>

    <label>Email:</label><br>
    <input type="email" name="email" required value="<?= $user['email'] ?>"><br><br>

    <label>Role:</label><br>
    <select name="role">
      <option value="guru" <?= $user['role'] === 'guru' ? 'selected' : '' ?>>Guru</option>
      <option value="siswa" <?= $user['role'] === 'siswa' ? 'selected' : '' ?>>Siswa</option>
    </select><br><br>

    <label>Password Baru (kosongkan jika tidak ingin ganti):</label><br>
    <input type="password" name="password"><br><br>

    <button type="submit" name="update">Simpan Perubahan</button>
  </form>

  <br>
  <a href="logout-api.php">logout</a>|
  <a href="hapus_user.php" onclick="return confirm('Yakin ingin hapus akun Anda dan semua data kursus?')">❌ Hapus Akun</a>
 |<a href="../index.php">Beranda</a>
</body>
</html>
