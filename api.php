<?php
header('Pragma: no-cache');
header('Expires: Thu, 01 Jan 1970 00:00:00 GMT');
header('Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0');
header('Accept-Ranges: bytes');
header('Content-Disposition: inline');
header('Content-Type: application/json; charset=utf-8');

$input = json_decode(file_get_contents('php://input'), true);
if (!is_array($input) || empty($input)) {
    header('HTTP/1.1 400 Bad Request', true, 400);
    exit;
}
require('./TicTac.php');

$ticTac = new TicTac($input);
$ticTac->AI();
$result = $ticTac->result();

echo json_encode($result);

exit;
