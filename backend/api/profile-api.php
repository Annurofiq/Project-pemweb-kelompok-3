<?php
require '../config/database.php';
header("Content-Type: application/json");

// CORS jika frontend dan backend terpisah
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

// Tangani preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
parse_str($_SERVER['QUERY_STRING'] ?? '', $query);
parse_str(file_get_contents("php://input"), $input); // untuk PUT/DELETE

$id = $query['id'] ?? null;

switch ($method) {
    case 'GET':
        if ($id) {
            $result = $conn->query("SELECT id, name, email, role FROM users WHERE id=$id");
            $data = $result->fetch_assoc();
            echo json_encode($data ?: ["message" => "User tidak ditemukan"]);
        } else {
            $res = $conn->query("SELECT id, name, email, role FROM users");
            $users = [];
            while ($row = $res->fetch_assoc()) {
                $users[] = $row;
            }
            echo json_encode($users);
        }
        break;

    case 'POST':
        $name = $_POST['name'] ?? '';
        $email = $_POST['email'] ?? '';
        $role = $_POST['role'] ?? 'user'; // default user
        $password = $_POST['password'] ?? '';

        if ($name && $email && $role && $password) {
            $hashed = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $conn->prepare("INSERT INTO users (name, email, role, password) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("ssss", $name, $email, $role, $hashed);
            if ($stmt->execute()) {
                echo json_encode(["message" => "✅ User berhasil ditambahkan"]);
            } else {
                echo json_encode(["message" => "❌ Gagal tambah user: " . $stmt->error]);
            }
            $stmt->close();
        } else {
            echo json_encode(["message" => "❗ Semua field wajib diisi"]);
        }
        break;

    case 'PUT':
        if (!$id) {
            echo json_encode(["message" => "❗ ID wajib disertakan"]);
            exit;
        }

        $name = $conn->real_escape_string($input['name'] ?? '');
        $email = $conn->real_escape_string($input['email'] ?? '');
        $role = $input['role'] ?? 'user';
        $password = $input['password'] ?? '';

        if ($name && $email && $role) {
            if ($password !== '') {
                $hashed = password_hash($password, PASSWORD_DEFAULT);
                $sql = "UPDATE users SET name='$name', email='$email', role='$role', password='$hashed' WHERE id=$id";
            } else {
                $sql = "UPDATE users SET name='$name', email='$email', role='$role' WHERE id=$id";
            }

            if ($conn->query($sql)) {
                echo json_encode(["message" => "✅ User berhasil diperbarui"]);
            } else {
                echo json_encode(["message" => "❌ Gagal update: " . $conn->error]);
            }
        } else {
            echo json_encode(["message" => "❗ Semua field wajib diisi"]);
        }
        break;

    case 'DELETE':
        if (!$id) {
            echo json_encode(["message" => "❗ ID wajib disertakan"]);
            exit;
        }

        // Hapus enrollment dulu
        $conn->query("DELETE FROM enrollments WHERE user_id=$id");

        // Hapus user
        if ($conn->query("DELETE FROM users WHERE id=$id")) {
            echo json_encode(["message" => "✅ User dan data enrollments dihapus"]);
        } else {
            echo json_encode(["message" => "❌ Gagal hapus user: " . $conn->error]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "❌ Metode tidak didukung"]);
}
?>
