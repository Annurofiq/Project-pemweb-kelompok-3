<?php
session_start(); // WAJIB untuk akses $_SESSION

require '../config/database.php';
header("Content-Type: application/json");

// === CORS Handling ===
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// === Ambil metode request ===
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $result = $conn->query("SELECT * FROM courses ORDER BY id DESC");
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode($data);
        break;

    case 'POST':
        $input = json_decode(file_get_contents("php://input"), true);

        $title = $conn->real_escape_string($input['title'] ?? '');
        $description = $conn->real_escape_string($input['description'] ?? '');
        $price = intval($input['price'] ?? 0);
        $image = $conn->real_escape_string($input['image'] ?? '');
        $schedule = $conn->real_escape_string($input['schedule'] ?? '');

        // Ambil user ID dari session
        $created_by = $_SESSION['user']['id'] ?? null;

        if (!$created_by) {
            echo json_encode(["status" => "error", "message" => "User belum login"]);
            exit;
        }

        if ($title && $description && $price && $schedule) {
            $sql = "INSERT INTO courses (title, description, price, image, schedule, created_by)
                    VALUES ('$title', '$description', $price, '$image', '$schedule', $created_by)";
            if ($conn->query($sql)) {
                echo json_encode(["status" => "success", "message" => "Kelas berhasil ditambahkan"]);
            } else {
                echo json_encode(["status" => "error", "message" => $conn->error]);
            }
        } else {
            echo json_encode(["status" => "error", "message" => "Data tidak lengkap"]);
        }
        break;

case 'DELETE':
    // Ambil ID dari body JSON (karena axios mengirim di body)
    $input = json_decode(file_get_contents("php://input"), true);
    $id = intval($input['id'] ?? 0);

    if ($id > 0) {
        $sql = "DELETE FROM courses WHERE id = $id";
        if ($conn->query($sql)) {
            echo json_encode(["status" => "success", "message" => "Kelas berhasil dihapus"]);
        } else {
            echo json_encode(["status" => "error", "message" => $conn->error]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "ID tidak valid"]);
    }
    break;

    case 'PUT':
        parse_str(file_get_contents("php://input"), $input);

        $id = intval($input['id'] ?? 0);
        $title = $conn->real_escape_string($input['title'] ?? '');
        $description = $conn->real_escape_string($input['description'] ?? '');
        $price = intval($input['price'] ?? 0);
        $image = $conn->real_escape_string($input['image'] ?? '');
        $schedule = $conn->real_escape_string($input['schedule'] ?? '');

        $created_by = $_SESSION['user']['id'] ?? null;
        if (!$created_by) {
            echo json_encode(["status" => "error", "message" => "User belum login"]);
            exit;
        }

        if ($id && $title && $description && $price && $schedule) {
            $sql = "UPDATE courses SET 
                        title='$title', 
                        description='$description', 
                        price=$price, 
                        image='$image', 
                        schedule='$schedule', 
                        created_by=$created_by
                    WHERE id=$id";
            if ($conn->query($sql)) {
                echo json_encode(["status" => "success", "message" => "Kelas berhasil diupdate"]);
            } else {
                echo json_encode(["status" => "error", "message" => $conn->error]);
            }
        } else {
            echo json_encode(["status" => "error", "message" => "Data tidak lengkap atau ID tidak valid"]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["status" => "error", "message" => "Metode tidak diizinkan"]);
        break;
}
?>
