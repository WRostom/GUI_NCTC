<?php
$root = realpath($_SERVER["DOCUMENT_ROOT"]);
require($root."/mqtt/phpMQTT.php");

function sendMessage($message = NULL){
    $mqtt = new phpMQTT("192.168.1.14", 1883, "user1");

    if ($mqtt->connect(true, null, "wrostom", "Een22387")) {
        $mqtt->publish("wrostom/dev/onoff",$message,0);
        $mqtt->close();
    }
    return $message;
}
?>