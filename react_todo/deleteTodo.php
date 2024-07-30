<?php
header('Access-Control-Allow-Origin: *');
include('./connection.php');

if (!isset($_POST['id'])) {
    $response = ['success' => false, 'message' => 'ID is requred'];
} else {
    $id = $_POST['id'];

    $query = "DELETE from todos WHERE id = '$id'";
    $result = mysqli_query($connect, $query);

    if ($result) {
        $response = ['success' => true, 'message' => 'Todo deleted sucessfully'];
    } else {
        $response = ['success' => false, 'message' => 'Something went wrong while deleting the todo'];
    }
}

echo json_encode($response);
