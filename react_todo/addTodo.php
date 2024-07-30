<?php
header('Access-Control-Allow-Origin: *');
include('./connection.php');

if (!isset($_POST['todo'])) {
    $response = ['success' => false, 'message' => 'Todo is requred'];
} else {
    $todo = $_POST['todo'];

    $query = "INSERT into todos (todo) values('$todo')";
    $result = mysqli_query($connect, $query);

    if ($result) {
        $response = ['success' => true, 'message' => 'Todo added sucessfully'];
    } else {
        $response = ['success' => false, 'message' => 'Something went wrong while adding the todo'];
    }
}

echo json_encode($response);
