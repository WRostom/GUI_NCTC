<?php
$root = realpath($_SERVER["DOCUMENT_ROOT"]);
$FULLCOMMAND = 'cd ' . trim($root) . '/arduino-builder && ./compile.sh 2>&1';
exec($FULLCOMMAND, $output, $return);
foreach ($output as $key) {
    echo $key . "<br>";
}
?>
