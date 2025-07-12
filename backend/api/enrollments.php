<?php
require '../config/database.php';
header("Content-Type: text/html; charset=UTF-8");

$message = "";
$editMode = false;
$editId = null;
$selectedUserId = "";
$selectedCourseId = "";

// ==== PROSES TAMBAH / UPDATE ====
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $aksi = $_POST['aksi'];
    $user_id = intval($_POST['user_id']);
    $course_id = intval($_POST['course_id']);

    if ($aksi === 'tambah') {
        // Cek apakah user sudah mendaftar kelas yang sama
        $check = $conn->prepare("SELECT id FROM enrollments WHERE user_id = ? AND course_id = ?");
        $check->bind_param("ii", $user_id, $course_id);
        $check->execute();
        $check->store_result();

        if ($check->num_rows > 0) {
            $message = "<p style='color:red;'>❌ Kamu Sudah Daftar Kelas Ini</p>";
        } else {
            $stmt = $conn->prepare("INSERT INTO enrollments (user_id, course_id, enrolled_at) VALUES (?, ?, NOW())");
            $stmt->bind_param("ii", $user_id, $course_id);
            if ($stmt->execute()) {
                $message = "<p style='color:green;'>✅ Berhasil mendaftar kursus!</p>";
            } else {
                $message = "<p style='color:red;'>❌ Gagal: " . htmlspecialchars($stmt->error) . "</p>";
            }
            $stmt->close();
        }
        $check->close();
    }

    if ($aksi === 'update' && isset($_POST['id'])) {
        $id = intval($_POST['id']);

        // Cek apakah data yang ingin diupdate akan menimbulkan duplikat
        $check = $conn->prepare("SELECT id FROM enrollments WHERE user_id = ? AND course_id = ? AND id != ?");
        $check->bind_param("iii", $user_id, $course_id, $id);
        $check->execute();
        $check->store_result();

        if ($check->num_rows > 0) {
            $message = "<p style='color:red;'>❌ Pendaftaran dengan kombinasi yang sama sudah ada!</p>";
        } else {
            $stmt = $conn->prepare("UPDATE enrollments SET user_id=?, course_id=? WHERE id=?");
            $stmt->bind_param("iii", $user_id, $course_id, $id);
            if ($stmt->execute()) {
                $message = "<p style='color:green;'>✅ Data berhasil diperbarui</p>";
            } else {
                $message = "<p style='color:red;'>❌ Gagal update: " . htmlspecialchars($stmt->error) . "</p>";
            }
            $stmt->close();
        }
        $check->close();
    }
}

// ==== PROSES DELETE ====
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['hapus'])) {
    $id = intval($_GET['hapus']);
    $conn->query("DELETE FROM enrollments WHERE id=$id");
    $message = "<p style='color:green;'>✅ Pendaftaran dihapus</p>";
}

// ==== MODE EDIT ====
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['edit'])) {
    $editMode = true;
    $editId = intval($_GET['edit']);
    $res = $conn->query("SELECT * FROM enrollments WHERE id=$editId");
    $data = $res->fetch_assoc();
    $selectedUserId = $data['user_id'];
    $selectedCourseId = $data['course_id'];
}
?>

<!DOCTYPE html>
<html>
<head>
  <title>Manajemen Pendaftaran Kursus</title>
</head>
<body>
  <h2><?= $editMode ? '✏️ Edit Pendaftaran Kursus' : '📥 Tambah Pendaftaran Baru' ?></h2>
  <?= $message ?>

  <!-- Form Tambah / Edit -->
  <form method="POST" action="">
    <input type="hidden" name="aksi" value="<?= $editMode ? 'update' : 'tambah' ?>">
    <?php if ($editMode): ?>
      <input type="hidden" name="id" value="<?= $editId ?>">
    <?php endif; ?>

    <label><strong>👤 Pilih Pengguna:</strong></label><br>
    <select name="user_id" required>
      <option value="">-- Pilih Pengguna --</option>
      <?php
        $users = $conn->query("SELECT id, name FROM users");
        while ($row = $users->fetch_assoc()) {
            $selected = ($row['id'] == $selectedUserId) ? 'selected' : '';
            echo "<option value='{$row['id']}' $selected>{$row['name']}</option>";
        }
      ?>
    </select><br><br>

    <label><strong>📘 Pilih Kursus:</strong></label><br>
    <select name="course_id" required>
      <option value="">-- Pilih Kursus --</option>
      <?php
        $courses = $conn->query("SELECT id, title FROM courses");
        while ($row = $courses->fetch_assoc()) {
            $selected = ($row['id'] == $selectedCourseId) ? 'selected' : '';
            echo "<option value='{$row['id']}' $selected>{$row['title']}</option>";
        }
      ?>
    </select><br><br>

    <button type="submit"><?= $editMode ? '💾 Simpan Perubahan' : '➕ Daftar Sekarang' ?></button>
    <?php if ($editMode): ?>
      <a href="enrollments.php">Batal</a>
    <?php endif; ?>
  </form>

  <hr>

  <h3>📋 Daftar Pendaftaran</h3>
  <table border="1" cellpadding="10" cellspacing="0">
    <tr>
      <th>No</th>
      <th>Nama Pengguna</th>
      <th>Nama Kursus</th>
      <th>Waktu Daftar</th>
      <th>Aksi</th>
    </tr>
    <?php
      $result = $conn->query("SELECT e.id, u.name AS user_name, c.title AS course_title, e.enrolled_at
                              FROM enrollments e
                              JOIN users u ON e.user_id = u.id
                              JOIN courses c ON e.course_id = c.id
                              ORDER BY e.enrolled_at DESC");
      $no = 1;
      while ($row = $result->fetch_assoc()) {
          echo "<tr>
                  <td>{$no}</td>
                  <td>{$row['user_name']}</td>
                  <td>{$row['course_title']}</td>
                  <td>{$row['enrolled_at']}</td>
                  <td>
                    <a href='?edit={$row['id']}'>✏️ Edit</a> |
                    <a href='?hapus={$row['id']}' onclick='return confirm(\"Hapus pendaftaran ini?\")'>🗑️ Hapus</a>
                  </td>
                </tr>";
          $no++;
      }
    ?>
  </table>

  <br><a href="../index.php">⬅️ Kembali ke Beranda</a>
</body>
</html>
