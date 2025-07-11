<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

if (isset($_SESSION['user'])) {
    echo json_encode(["logged_in" => true, "user" => $_SESSION['user']]);
} else {
    http_response_code(401);
    echo json_encode(["logged_in" => false, "message" => "Belum login"]);
}
