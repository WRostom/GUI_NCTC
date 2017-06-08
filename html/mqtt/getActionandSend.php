<?php

require("./sendMessage.php");

$message = $_REQUEST["message"];
echo sendMessage($message);
?>