<?php
    $movements =  $_REQUEST["codeBlock"];
    $root = realpath($_SERVER["DOCUMENT_ROOT"]);
    // echo $root;
    require($root. "/mqtt/sendMessage.php");

    //File paths
    $rootpath = trim($root);
    $filePath = "$rootpath/arduino-builder/Network-Controlled-Toy-Car/Network-Controlled-Toy-Car.ino";
    $filePathp1 = "$root/arduino-builder/Network-Controlled-Toy-Car/NCTC1.txt";
    $filePathp2 = "$root/arduino-builder/Network-Controlled-Toy-Car/NCTC2.txt";
    $file = file_get_contents($filePath);
    $file1 = file_get_contents($filePathp1);
    $file2 = file_get_contents($filePathp2);
    $startofText = "char motions[] = {";
    $previousValue = [];
    //Edit file to add new actions
    for ($i=0; $i < count($movements); $i++) {
        if($i == count($movements) - 1){
            $value = "'" . trim($movements[$i] . "'");
            array_push($previousValue, $value);
        } else {
            $value = "'" . trim($movements[$i]) . "', ";
            array_push($previousValue, $value);
        }
    }
    $endofText = implode("", $previousValue);
    $combineString =  $startofText . $endofText . ", 'X'};";
    file_put_contents($filePath, $file1. $combineString. "\n" . $file2);

    //Compile INO file to BIN
    $FULLCOMMAND = 'cd ' . trim($root) . '/arduino-builder && ./compile.sh 2>&1';
    exec($FULLCOMMAND, $output, $return);
    echo sendMessage("U");

    
    //Output compilation output to browser. Tesing purposes
    //   foreach ($output as $key) {
    //       echo $key . "<br>";
    //   }
?> 