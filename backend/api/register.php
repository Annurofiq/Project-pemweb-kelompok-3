<?php
require '../config/database.php';
header("Content-Type: text/html; charset=UTF-8");

// Jika form disubmit
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name     = $_POST['name'] ?? '';
    $email    = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';
    $role     = $_POST['role'] ?? '';

    // Validasi data
    if (!$name || !$email || !$password || !$role) {
        echo "<p style='color:red'>Semua field harus diisi.</p>";
    } else {
        $passwordHashed = password_hash($password, PASSWORD_BCRYPT);

        // Cek email sudah terdaftar belum
        $check = $conn->query("SELECT id FROM users WHERE email='$email'");
        if ($check->num_rows > 0) {
            echo "<p style='color:red'>Email sudah terdaftar!</p>";
        } else {
            $sql = "INSERT INTO users (name, email, password, role) VALUES ('$name', '$email', '$passwordHashed', '$role')";
            if ($conn->query($sql)) {
                echo "<p style='color:green'>Registrasi berhasil!</p>";
            } else {
                echo "<p style='color:red'>Terjadi kesalahan: " . $conn->error . "</p>";
            }
        }
    }
}
?>

<!-- HTML Form -->
<!DOCTYPE html>
<html>
<head>
  <title>Register</title>
</head>
<body>
  <h2>Form Register</h2>
  <form method="POST" action="">
    <label>Nama:</label><br>
    <input type="text" name="name" required><br><br>

    <label>Email:</label><br>
    <input type="email" name="email" required><br><br>

    <label>Password:</label><br>
    <input type="password" name="password" required><br><br>

    <label>Role:</label><br>
    <select name="role">
      <option value="guru">Guru</option>
      <option value="siswa">Siswa</option>
    </select><br><br>

    <button type="submit">Daftar</button>
  </form>
  <br>
  <a href="../index.php">Kembali</a>
</body>
</html>
