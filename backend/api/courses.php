<?php
session_start();
require '../config/database.php';
header("Content-Type: text/html; charset=UTF-8");

// Cek login
if (!isset($_SESSION['user']['id'])) {
    echo "<p style='color:red'>Anda harus login terlebih dahulu.</p>";
    exit;
}

$user = $_SESSION['user'];
$isAdmin = ($user['role'] === 'Admin');

$method = $_SERVER['REQUEST_METHOD'];
$editMode = false;
$editData = null;

// ========== TAMBAH ========== //
if ($isAdmin && $method === 'POST' && $_POST['aksi'] === 'tambah') {
    $title = $conn->real_escape_string($_POST['title']);
    $description = $conn->real_escape_string($_POST['description']);
    $price = floatval($_POST['price']);
    $image = $conn->real_escape_string($_POST['image']);
    $schedule = $conn->real_escape_string($_POST['schedule']);
    $created_by = intval($user['id']);

    $sql = "INSERT INTO courses (title, description, price, image, schedule, created_by)
            VALUES ('$title', '$description', $price, '$image', '$schedule', $created_by)";
    if ($conn->query($sql)) {
        echo "<p style='color:green'>✅ Kursus berhasil ditambahkan!</p>";
    } else {
        echo "<p style='color:red'>❌ Gagal menambahkan kursus: " . $conn->error . "</p>";
    }
}

// ========== HAPUS ========== //
if ($isAdmin && $method === 'POST' && $_POST['aksi'] === 'hapus') {
    $id = intval($_POST['id']);
    $sql = "DELETE FROM courses WHERE id=$id";
    if ($conn->query($sql)) {
        echo "<p style='color:green'>✅ Kursus berhasil dihapus!</p>";
    } else {
        echo "<p style='color:red'>❌ Gagal menghapus kursus: " . $conn->error . "</p>";
    }
}

// ========== EDIT - SIMPAN ========== //
if ($isAdmin && $method === 'POST' && $_POST['aksi'] === 'update') {
    $id = intval($_POST['id']);
    $title = $conn->real_escape_string($_POST['title']);
    $description = $conn->real_escape_string($_POST['description']);
    $price = floatval($_POST['price']);
    $image = $conn->real_escape_string($_POST['image']);
    $schedule = $conn->real_escape_string($_POST['schedule']);
    $created_by = intval($user['id']);

    $sql = "UPDATE courses SET 
                title='$title', 
                description='$description', 
                price=$price, 
                image='$image', 
                schedule='$schedule', 
                created_by=$created_by 
            WHERE id=$id";
    if ($conn->query($sql)) {
        echo "<p style='color:green'>✅ Kursus berhasil diperbarui!</p>";
    } else {
        echo "<p style='color:red'>❌ Gagal memperbarui kursus: " . $conn->error . "</p>";
    }
}

// ========== TAMPILKAN DATA UNTUK EDIT ========== //
if ($isAdmin && $method === 'GET' && isset($_GET['edit'])) {
    $editMode = true;
    $id = intval($_GET['edit']);
    $res = $conn->query("SELECT * FROM courses WHERE id=$id");
    $editData = $res->fetch_assoc();
}
?>

<!DOCTYPE html>
<html>
<head>
  <title>Manajemen Kursus</title>
</head>
<body>

  <?php if ($isAdmin): ?>
    <h2><?= $editMode ? "✏️ Edit Kursus" : "➕ Tambah Kursus Baru" ?></h2>
    <!-- FORM TAMBAH / EDIT -->
    <form method="POST" action="">
      <input type="hidden" name="aksi" value="<?= $editMode ? 'update' : 'tambah' ?>">
      <?php if ($editMode): ?>
        <input type="hidden" name="id" value="<?= $editData['id'] ?>">
      <?php endif; ?>

      <label>Judul:</label><br>
      <input type="text" name="title" required value="<?= $editMode ? $editData['title'] : '' ?>"><br><br>

      <label>Deskripsi:</label><br>
      <textarea name="description" required><?= $editMode ? $editData['description'] : '' ?></textarea><br><br>

      <label>Harga:</label><br>
      <input type="number" step="0.01" name="price" required value="<?= $editMode ? $editData['price'] : '' ?>"><br><br>

      <label>URL Gambar:</label><br>
      <input type="text" name="image" required value="<?= $editMode ? $editData['image'] : '' ?>"><br><br>

      <label>Jadwal:</label><br>
      <input type="datetime-local" name="schedule" required value="<?= $editMode ? date('Y-m-d\TH:i', strtotime($editData['schedule'])) : '' ?>"><br><br>

      <button type="submit"><?= $editMode ? '💾 Simpan Perubahan' : 'Tambah' ?></button>
      <?php if ($editMode): ?>
        <a href="courses.php">Batal</a>
      <?php endif; ?>
    </form>
    <hr>
  <?php endif; ?>

  <!-- TABEL KURSUS -->
  <h2>📚 Daftar Kursus</h2>
  <table border="1" cellpadding="10">
    <tr>
      <th>ID</th>
      <th>Judul</th>
      <th>Deskripsi</th>
      <th>Harga</th>
      <th>Gambar</th>
      <th>Jadwal</th>
      <th>Pembuat</th>
      <?php if ($isAdmin): ?>
        <th>Aksi</th>
      <?php endif; ?>
    </tr>

    <?php
    $res = $conn->query("SELECT courses.*, users.name AS creator_name 
                         FROM courses 
                         JOIN users ON courses.created_by = users.id");
    while ($row = $res->fetch_assoc()) {
        echo "<tr>
                <td>{$row['id']}</td>
                <td>{$row['title']}</td>
                <td>{$row['description']}</td>
                <td>Rp " . number_format($row['price'], 0, ',', '.') . "</td>
                <td><img src='{$row['image']}' alt='img' width='100'></td>
                <td>" . date('d M Y H:i', strtotime($row['schedule'])) . "</td>
                <td>{$row['creator_name']}</td>";
        if ($isAdmin) {
            echo "<td>
                    <form method='POST' action='' style='display:inline-block'>
                      <input type='hidden' name='aksi' value='hapus'>
                      <input type='hidden' name='id' value='{$row['id']}'>
                      <button type='submit' onclick='return confirm(\"Yakin ingin hapus kursus ini?\")'>🗑️ Hapus</button>
                    </form>
                    <a href='?edit={$row['id']}'>✏️ Edit</a>
                  </td>";
        }
        echo "</tr>";
    }
    ?>
  </table>

  <br>
  <a href="../index.php">⬅️ Kembali</a>
</body>
</html>
