<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, User-Agent, Authorization');

include('./connection.php');

$query = 'SELECT * from todos';
$result = mysqli_query($connect, $query);

$todos = array();

while ($row = mysqli_fetch_array($result)) {
    $todos[] = array(
        'id' => $row['id'],
        'todo' => $row['todo'],
    );
}

$response = ['success' => true, 'data' => $todos];
echo json_encode($response);
