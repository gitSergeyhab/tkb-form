<?php
// в php почти не разбираюсь, но вроде работает
$content = file_get_contents("php://input");
$decoded = json_decode($content, true);
die(json_encode(is_array($decoded)));
?>