<?php
header('Access-Control-Allow-Origin: *');
include('./connection.php');

if (!isset($_POST['id']) && !isset($_POST['todo'])) {
    $response = ['success' => false, 'message' => 'ID and Todo is requred'];
} else {
    $id = $_POST['id'];
    $todo = $_POST['todo'];

    $query = "UPDATE todos set todo = '$todo' where id = '$id'";
    $result = mysqli_query($connect, $query);

    if ($result) {
        $response = ['success' => true, 'message' => 'Todo added sucessfully'];
    } else {
        $response = ['success' => false, 'message' => 'Something went wrong while adding the todo'];
    }
}

echo json_encode($response);
